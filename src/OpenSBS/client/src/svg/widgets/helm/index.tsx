import * as React from 'react';
import {connect} from 'react-redux';
import HelmPropsModel from './helm-props.model';
import SvgTransforms from '../../../lib/svgTransforms';
import SpaceshipActions from '../../../store/spaceship/spaceshipActions';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import EngineModule from '../../../modules/engines/engineModule';
import DisplayElement from '../../elements/display.element';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';
import HelmStatusElement from './helm-status.element';
import SwitchElement from '../../elements/switch.element';
import PanelElement from '../../elements/panel.element';
import ButtonElement from '../../elements/button.element';

class HelmWidget extends React.Component<HelmPropsModel, {}> {
    private readonly translation: string;

    constructor(props: HelmPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onRudderLeftClick = this.onRudderLeftClick.bind(this);
        this.onRudderRightClick = this.onRudderRightClick.bind(this);
    }

    public render() {
        const rudder = this.getRudderValue();
        const yaw = Angles.normalizeYaw(Vectors.getYaw(this.props.direction));

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={300} isOffline={!this.props.engineModule}>
                <ButtonElement
                    x={10} y={10}
                    width={420} height={60}
                    fontSize={2} color='darkorange'
                    onClick={() => this.setRudder(0)}
                >STOP</ButtonElement>

                <SwitchElement
                    x={10} y={80}
                    width={100} height={140}
                    fontSize={3} color='darkturquoise'
                    toggled={rudder < 0}
                    onClick={this.onRudderLeftClick}
                >◄</SwitchElement>
                <DisplayElement
                    x={220} y={150}
                    topLabel="BEARING"
                    bottomLabel="degrees"
                >{yaw.toString().padStart(3, '0')}</DisplayElement>
                <SwitchElement
                    x={330} y={80}
                    width={100} height={140}
                    fontSize={3} color='darkturquoise'
                    toggled={rudder > 0}
                    onClick={this.onRudderRightClick}
                >►</SwitchElement>
                <line
                    x1="0" y1="230"
                    x2="441" y2="230"
                    stroke="#383838" strokeWidth="2"
                />
                <HelmStatusElement
                    x={10} y={240}
                    rudder={rudder}
                />
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
        direction: SpaceshipSelectors.getDirection(state),
        engineModule: SpaceshipSelectors.getModuleByType<EngineModule>(state, 'module.engine'),
    };
};

export default connect(mapStateToProps)(HelmWidget);
