import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import PanelElement from '../../elements/panel.element';
import SwitchElement from '../../elements/switch.element';
import ButtonElement from '../../elements/button.element';
import ShieldElement from './shield.element';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import ShieldModuleModel from '../../../modules/shield-module.model';
import {ShieldSectorModel} from '../../../modules/shield-sector.model';
import EntitySide from '../../../models/entity-side';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';
import ColorPalette from '../../color-palette';

interface ShieldPropsModel {
    x: number,
    y: number,
    entityId: string,
    shieldModule: ShieldModuleModel | undefined,
    dispatch: any,
}

class ShieldWidget extends React.Component<ShieldPropsModel, {}> {
    private readonly translation: string;

    constructor(props: ShieldPropsModel) {
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
                width={450} height={470}
                isOffline={!this.props.shieldModule}
            >
                <g>
                    <line x1="0" y1="60" x2="450" y2="60" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                    <line x1="110" y1="60" x2="110" y2="470" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                    <line x1="220" y1="60" x2="220" y2="470" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                    <line x1="330" y1="60" x2="330" y2="470" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>

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

                    <ShieldElement
                        x={55} y={60}
                        label="FRONT"
                        shieldSector={this.getShieldSector(EntitySide.FRONT)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                    <ShieldElement
                        x={165} y={60}
                        label="LEFT"
                        shieldSector={this.getShieldSector(EntitySide.LEFT)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                    <ShieldElement
                        x={275} y={60}
                        label="RIGHT"
                        shieldSector={this.getShieldSector(EntitySide.RIGHT)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                    <ShieldElement
                        x={385} y={60}
                        label="REAR"
                        shieldSector={this.getShieldSector(EntitySide.REAR)}
                        availableCalibrationPoints={availableCalibrationPoints}
                        onSetCalibration={this.setCalibration}
                        onReinforce={this.reinforceSide}
                    />
                </g>
            </PanelElement>
        );
    }

    private getShieldSector(side: string): ShieldSectorModel | undefined {
        return this.props.shieldModule?.sectors.find((item: ShieldSectorModel) => item.side === side);
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
