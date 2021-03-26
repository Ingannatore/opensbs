import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import DisplayElement from '../../elements/display.element';
import {EngineModuleModel} from '../../../modules/engine-module.model';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import {connect} from 'react-redux';
import PanelElement from '../../elements/panel.element';
import HolobuttonElement from '../../elements/holobutton.element';
import ThrottleElement from './throttle.element';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';

interface EngineWidgetModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    linearSpeed: number,
    engineModule: EngineModuleModel,
}

class EngineWidget extends React.Component<EngineWidgetModel, {}> {
    private readonly translation: string;

    constructor(props: EngineWidgetModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onThrottleClick = this.onThrottleClick.bind(this);
        this.onFullAheadClick = this.onFullAheadClick.bind(this);
        this.onFullAsternClick = this.onFullAsternClick.bind(this);
        this.onFullStopClick = this.onFullStopClick.bind(this);
    }

    public render() {
        const throttle = this.props.engineModule?.throttle ?? 0;
        const targetSpeed = Math.round(this.props.engineModule?.maximumSpeed * (throttle / 100) ?? 0);

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={440} height={610} mirror={true}>
                <ThrottleElement
                    x={0} y={10}
                    throttle={throttle}
                    targetSpeed={targetSpeed}
                    onClick={this.onThrottleClick}
                />
                <line
                    x1="210" y1="0"
                    x2="210" y2="610"
                    stroke="#383838" strokeWidth="2"
                />

                <DisplayElement
                    x={320} y={80}
                    topLabel=" CURRENT SPEED"
                    bottomLabel="meters/sec"
                >{Math.round(this.props.linearSpeed)}</DisplayElement>

                <HolobuttonElement
                    x={220} y={230}
                    width={200} height={60}
                    fontSize={1.75} color='darkturquoise'
                    toggled={false}
                    onClick={this.onFullAheadClick}
                >FULL AHEAD</HolobuttonElement>
                <HolobuttonElement
                    x={220} y={320}
                    width={200} height={60}
                    fontSize={1.75} color='darkturquoise'
                    toggled={false}
                    onClick={this.onFullAsternClick}
                >FULL ASTERN</HolobuttonElement>

                <HolobuttonElement
                    x={220} y={540}
                    width={200} height={60}
                    fontSize={1.75} color='darkorange'
                    toggled={false}
                    onClick={this.onFullStopClick}
                >FULL STOP</HolobuttonElement>
            </PanelElement>
        );
    }

    private onThrottleClick(event: React.MouseEvent<SVGElement, MouseEvent>, throttle: number) {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setThrottle',
            throttle
        ));
    }

    private onFullAheadClick() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setThrottle',
            100
        ));
    }

    private onFullAsternClick() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setThrottle',
            -100
        ));
    }

    private onFullStopClick() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setThrottle',
            0
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        linearSpeed: SpaceshipSelectors.getLinearSpeed(state),
        engineModule: SpaceshipSelectors.getModuleByType(state, 'module.engine') as EngineModuleModel,
    };
};

export default connect(mapStateToProps)(EngineWidget);
