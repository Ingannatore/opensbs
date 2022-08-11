import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import DisplayElement from '../../elements/displayElement';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import PanelElement from '../../elements/panelElement';
import ThrottleElement from './throttleElement';
import SpaceshipActions from '../../../store/spaceship/spaceshipActions';
import ButtonElement from '../../elements/buttonElement';
import EngineModule from '../../../modules/engines/engineModule';
import ColorPalette from '../../colorPalette';

interface EngineWidgetProps {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    linearSpeed: number,
    engineModule: EngineModule | undefined,
}

class EngineWidget extends React.Component<EngineWidgetProps, {}> {
    private readonly translation: string;

    constructor(props: EngineWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const targetSpeed = this.props.engineModule?.targetSpeed ?? 0;
        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={610}
                isOffline={!this.props.engineModule}
            >
                <g transform="translate(20 0)">
                    <ThrottleElement
                        x={0} y={10}
                        throttle={this.props.engineModule?.throttle ?? 0}
                        targetSpeed={targetSpeed}
                        onClick={(value) => this.setThrottle(value)}
                    />
                    <line
                        x1="210" y1="0"
                        x2="210" y2="610"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    />

                    <DisplayElement
                        x={320} y={80}
                        topLabel=" CURRENT SPEED"
                        bottomLabel="meters/sec"
                    >{Math.round(this.props.linearSpeed)}</DisplayElement>
                    <DisplayElement
                        x={320} y={530}
                        topLabel=" TARGET SPEED"
                        bottomLabel="meters/sec"
                    >{Math.round(targetSpeed)}</DisplayElement>

                    <ButtonElement
                        x={220} y={170}
                        width={200} height={60}
                        fontSize={1.75}
                        onClick={() => this.setThrottle(100)}
                    >FULL AHEAD</ButtonElement>
                    <ButtonElement
                        x={220} y={275}
                        width={200} height={60}
                        fontSize={1.75} color={ColorPalette.WARNING}
                        onClick={() => this.setThrottle(0)}
                    >STOP</ButtonElement>
                    <ButtonElement
                        x={220} y={380}
                        width={200} height={60}
                        fontSize={1.75}
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
