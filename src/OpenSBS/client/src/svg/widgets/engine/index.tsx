import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from 'lib/svgTransforms';
import OverlayEvent from 'models/overlayEvent';
import EngineModule from 'modules/engines/engineModule';
import EngineService from 'modules/engines/engineService';
import SpaceshipActions from 'store/spaceship/spaceshipActions';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import ButtonElement from 'svg/elements/buttonElement';
import ClickableOverlay from 'svg/elements/clickableOverlay';
import DisplayElement from 'svg/elements/displayElement';
import PanelElement from 'svg/elements/panelElement';
import ThrottleMarkers from 'svg/widgets/engine/throttleMarkers';
import ThrottleSlider from 'svg/widgets/engine/throttleSlider';

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
        this.onOverlayClick = this.onOverlayClick.bind(this);
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
                    <ThrottleMarkers/>
                    <ThrottleSlider
                        x={100} y={305}
                        throttle={this.props.engineModule?.throttle ?? 0}
                    />
                    <ClickableOverlay
                        x={0} y={40}
                        width={200} height={530}
                        onClick={this.onOverlayClick}
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

    private onOverlayClick(event: OverlayEvent) {
        this.setThrottle(
            EngineService.normalizeThrottle(100 - 200 * event.verticalDeviation)
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
