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
import CurvedButtonElement from '../../elements/curved-button.element';
import RudderLockElement from './rudder-lock.element';
import StatusElement from './status.element';

interface HelmWidgetModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    direction: Vector3,
    engineModule: EngineModuleModel,
}

interface HelmWidgetState {
    isLocked: boolean,
}

class HelmWidget extends React.Component<HelmWidgetModel, HelmWidgetState> {
    private readonly translation: string;

    constructor(props: HelmWidgetModel) {
        super(props);
        this.state = {
            isLocked: false,
        };

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onRudderLeftClick = this.onRudderLeftClick.bind(this);
        this.onRudderRightClick = this.onRudderRightClick.bind(this);
        this.onRudderLockClick = this.onRudderLockClick.bind(this);
    }

    public render() {
        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const rudder = this.props.engineModule?.rudder ?? 0;

        return (
            <g transform={this.translation}>
                <RudderLockElement
                    x={0} y={-120}
                    toggled={this.state.isLocked}
                    onClick={this.onRudderLockClick}
                >RUDDER LOCK</RudderLockElement>

                <CurvedButtonElement
                    x={-140} y={0}
                    toggled={rudder < 0}
                    enabled={!this.state.isLocked}
                    onClick={this.onRudderLeftClick}
                >◄</CurvedButtonElement>
                <DisplayElement
                    x={0} y={0}
                    topLabel="BEARING"
                    bottomLabel="degrees"
                >{Math.round(yaw).toString().padStart(3, '0')}</DisplayElement>
                <CurvedButtonElement
                    x={140} y={0}
                    toggled={rudder > 0}
                    enabled={!this.state.isLocked}
                    onClick={this.onRudderRightClick}
                    mirrored={true}
                >►</CurvedButtonElement>

                <StatusElement
                    x={0} y={120}
                    label="helm status"
                >{HelmWidget.getHelmStatus(rudder)}</StatusElement>
            </g>
        );
    }

    private onRudderLockClick() {
        this.setState({
            ...this.state,
            isLocked: !this.state.isLocked
        });
    }

    private onRudderLeftClick() {
        if (this.state.isLocked) {
            return;
        }

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
        if (this.state.isLocked) {
            return;
        }

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
