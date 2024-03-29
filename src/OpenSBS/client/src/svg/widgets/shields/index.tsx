import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from 'lib/svgTransforms';
import EntitySide from 'models/entitySide';
import ShieldModule from 'modules/shields/shieldModule';
import ShieldService from 'modules/shields/shieldService';
import SpaceshipActions from 'store/spaceship/spaceshipActions';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import PanelElement from 'svg/elements/panelElement';
import SwitchElement from 'svg/elements/switchElement';
import ButtonElement from 'svg/elements/buttonElement';
import ShieldSectorElement from 'svg/widgets/shields/shieldSectorElement';

interface ShieldWidgetProps {
    x: number,
    y: number,
    entityId: string,
    shieldModule: ShieldModule | undefined,
    dispatch: any,
}

class ShieldWidget extends React.Component<ShieldWidgetProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.toggleShield = this.toggleShield.bind(this);
        this.setCalibration = this.setCalibration.bind(this);
        this.resetCalibration = this.resetCalibration.bind(this);
        this.reinforceSide = this.reinforceSide.bind(this);
    }

    public render() {
        const isShieldRaised = this.props.shieldModule?.isRaised ?? false;
        const availableCalibrationPoints = this.props.shieldModule?.availableCalibrationPoints ?? 0;

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={480}
                isOffline={!this.props.shieldModule}
            >
                <g>
                    <line x1="0" y1="60" x2="450" y2="60" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                    <line x1="110" y1="60" x2="110" y2="480" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                    <line x1="220" y1="60" x2="220" y2="480" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                    <line x1="330" y1="60" x2="330" y2="480" stroke={ColorPalette.MUTE} strokeWidth="2"/>

                    <SwitchElement
                        x={10} y={10}
                        width={310} height={40}
                        color={ColorPalette.WARNING}
                        onClick={this.toggleShield}
                        toggled={isShieldRaised}
                        enabled={!!this.props.shieldModule}
                    >SHIELDS {isShieldRaised ? 'UP' : 'DOWN'}</SwitchElement>
                    <ButtonElement
                        x={340} y={10}
                        width={90} height={40}
                        onClick={this.resetCalibration}
                    >RESET</ButtonElement>

                    <ShieldSectorElement
                        x={55} y={60}
                        shieldSector={ShieldService.findSector(this.props.shieldModule, EntitySide.FRONT)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                    <ShieldSectorElement
                        x={165} y={60}
                        shieldSector={ShieldService.findSector(this.props.shieldModule, EntitySide.LEFT)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                    <ShieldSectorElement
                        x={275} y={60}
                        shieldSector={ShieldService.findSector(this.props.shieldModule, EntitySide.RIGHT)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                    <ShieldSectorElement
                        x={385} y={60}
                        shieldSector={ShieldService.findSector(this.props.shieldModule, EntitySide.REAR)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                </g>
            </PanelElement>
        );
    }

    private toggleShield() {
        if (!this.props.shieldModule) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.shieldModule.id,
            'toggle',
            null
        ));
    }

    private setCalibration(side: string, value: number) {
        if (!this.props.shieldModule) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.shieldModule.id,
            'setCalibration',
            {side: side, value: value}
        ));
    }

    private resetCalibration() {
        if (!this.props.shieldModule) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.shieldModule.id,
            'resetCalibration',
            null
        ));
    }

    private reinforceSide(side: string) {
        if (!this.props.shieldModule) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.shieldModule.id,
            'reinforceSide',
            side
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        shieldModule: SpaceshipSelectors.getShield(state),
    };
};

export default connect(mapStateToProps)(ShieldWidget);
