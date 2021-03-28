import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import {EngineModuleModel} from '../../../modules/engine-module.model';
import DisplayElement from '../../elements/display.element';
import Vector3 from '../../../models/vector3';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';
import StatusElement from './status.element';
import HolobuttonElement from '../../elements/holobutton.element';
import PanelElement from '../../elements/panel.element';

interface HelmWidgetModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    direction: Vector3,
    engineModule: EngineModuleModel,
}

class HelmWidget extends React.Component<HelmWidgetModel, {}> {
    private readonly translation: string;

    constructor(props: HelmWidgetModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onRudderLeftClick = this.onRudderLeftClick.bind(this);
        this.onRudderRightClick = this.onRudderRightClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
    }

    public render() {
        let yaw = Math.round(Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction))));
        if (yaw === 360) {
            yaw = 0;
        }
        const rudder = this.props.engineModule?.rudder ?? 0;

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={440} height={300}>
                <HolobuttonElement
                    x={10} y={10}
                    width={420} height={60}
                    fontSize={2} color='darkorange'
                    onClick={this.onStopClick}
                >STOP</HolobuttonElement>

                <HolobuttonElement
                    x={10} y={80}
                    width={100} height={140}
                    fontSize={3} color='darkturquoise'
                    toggled={rudder < 0}
                    onClick={this.onRudderLeftClick}
                >◄</HolobuttonElement>
                <DisplayElement
                    x={220} y={150}
                    topLabel="BEARING"
                    bottomLabel="degrees"
                >{yaw.toString().padStart(3, '0')}</DisplayElement>
                <HolobuttonElement
                    x={330} y={80}
                    width={100} height={140}
                    fontSize={3} color='darkturquoise'
                    toggled={rudder > 0}
                    onClick={this.onRudderRightClick}
                >►</HolobuttonElement>
                <line
                    x1="0" y1="230"
                    x2="441" y2="230"
                    stroke="#383838" strokeWidth="2"
                />
                <StatusElement
                    x={10} y={240}
                    label="helm status"
                >{HelmWidget.getHelmStatus(rudder)}</StatusElement>
            </PanelElement>
        );
    }

    private onStopClick() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setRudder',
            0
        ));
    }

    private onRudderLeftClick() {
        const rudder = this.props.engineModule?.rudder ?? 0;
        if (rudder < 0) {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.engineModule.id,
                'setRudder',
                0
            ));
        } else {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.engineModule.id,
                'setRudder',
                -1
            ));
        }
    }

    private onRudderRightClick() {
        const rudder = this.props.engineModule?.rudder ?? 0;
        if (rudder > 0) {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.engineModule.id,
                'setRudder',
                0
            ));
        } else {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.engineModule.id,
                'setRudder',
                +1
            ));
        }
    }

    private static getHelmStatus(rudder: number): string {
        if (rudder < 0) {
            return 'Turning to Port';
        }
        if (rudder > 0) {
            return 'Turning to Starboard';
        }

        return 'Idle';
    }
}

const mapStateToProps = (state: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        direction: SpaceshipSelectors.getDirection(state),
        engineModule: SpaceshipSelectors.getModuleByType(state, 'module.engine') as EngineModuleModel,
    };
};

export default connect(mapStateToProps)(HelmWidget);
