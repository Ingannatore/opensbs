import * as React from 'react';
import {connect} from 'react-redux';
import EnginePropsModel from './engine-props.model';
import SvgTransforms from '../../../lib/svgTransforms';
import DisplayElement from '../../elements/display.element';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import PanelElement from '../../elements/panel.element';
import ThrottleElement from './throttle.element';
import SpaceshipActions from '../../../store/spaceship/spaceshipActions';
import ButtonElement from '../../elements/button.element';

class EngineWidget extends React.Component<EnginePropsModel, {}> {
    private readonly translation: string;

    constructor(props: EnginePropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.engineModule) {
            return null;
        }

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={610} isOffline={!this.props.engineModule}>
                <g transform="translate(20 0)">
                    <ThrottleElement
                        x={0} y={10}
                        throttle={this.props.engineModule.throttle}
                        targetSpeed={this.props.engineModule.targetSpeed}
                        onClick={(value) => this.setThrottle(value)}
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

                    <ButtonElement
                        x={220} y={175}
                        width={200} height={60}
                        fontSize={1.75} color='darkturquoise'
                        onClick={() => this.setThrottle(100)}
                    >FULL AHEAD</ButtonElement>
                    <ButtonElement
                        x={220} y={275}
                        width={200} height={60}
                        fontSize={1.75} color='darkorange'
                        onClick={() => this.setThrottle(0)}
                    >STOP</ButtonElement>
                    <ButtonElement
                        x={220} y={375}
                        width={200} height={60}
                        fontSize={1.75} color='darkturquoise'
                        onClick={() => this.setThrottle(-100)}
                    >FULL ASTERN</ButtonElement>
                </g>
            </PanelElement>
        );
    }

    private setThrottle(value: number) {
        if (!this.props.engineModule) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setThrottle',
            value
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        linearSpeed: SpaceshipSelectors.getLinearSpeed(state),
        engineModule: SpaceshipSelectors.getEngine(state),
    };
};

export default connect(mapStateToProps)(EngineWidget);
