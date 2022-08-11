import * as React from 'react';
import {connect} from 'react-redux';
import Angles from 'lib/angles';
import SvgTransforms from 'lib/svgTransforms';
import EngineModule from 'modules/engines/engineModule';
import SpaceshipActions from 'store/spaceship/spaceshipActions';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import ButtonElement from 'svg/elements/buttonElement';
import DisplayElement from 'svg/elements/displayElement';
import PanelElement from 'svg/elements/panelElement';
import SwitchElement from 'svg/elements/switchElement';

interface HelmWidgetProps {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    bearing: number,
    engineModule: EngineModule | undefined,
}

class HelmWidget extends React.Component<HelmWidgetProps, {}> {
    private readonly translation: string;

    constructor(props: HelmWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onRudderLeftClick = this.onRudderLeftClick.bind(this);
        this.onRudderRightClick = this.onRudderRightClick.bind(this);
    }

    public render() {
        const rudder = this.getRudderValue();

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={240}
                isOffline={!this.props.engineModule}
            >
                <ButtonElement
                    x={10} y={10}
                    width={420} height={60}
                    fontSize={2} color={ColorPalette.WARNING}
                    onClick={() => this.setRudder(0)}
                >STOP</ButtonElement>
                <line
                    x1="0" y1="80"
                    x2="450" y2="80"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                />
                <SwitchElement
                    x={10} y={90}
                    width={100} height={140}
                    fontSize={3}
                    toggled={rudder < 0}
                    onClick={this.onRudderLeftClick}
                >◄</SwitchElement>
                <DisplayElement
                    x={220} y={160}
                    topLabel="BEARING"
                    bottomLabel="degrees"
                >{Angles.bearingToString(this.props.bearing)}</DisplayElement>
                <SwitchElement
                    x={330} y={90}
                    width={100} height={140}
                    fontSize={3}
                    toggled={rudder > 0}
                    onClick={this.onRudderRightClick}
                >►</SwitchElement>
            </PanelElement>
        );
    }

    private onRudderLeftClick() {
        const rudder = this.getRudderValue();
        if (rudder < 0) {
            this.setRudder(0);
        } else {
            this.setRudder(-1);
        }
    }

    private onRudderRightClick() {
        const rudder = this.getRudderValue();
        if (rudder > 0) {
            this.setRudder(0);
        } else {
            this.setRudder(1);
        }
    }

    private getRudderValue(): number {
        return this.props.engineModule?.rudder ?? 0;
    }

    private setRudder(value: number) {
        if (!this.props.engineModule) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setRudder',
            value
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        bearing: SpaceshipSelectors.getBearing(state),
        engineModule: SpaceshipSelectors.getModuleByType<EngineModule>(state, 'module.engine'),
    };
};

export default connect(mapStateToProps)(HelmWidget);
