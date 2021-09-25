import * as React from 'react';
import {connect} from 'react-redux';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import DirectionsOverlay from './directions.overlay';
import RangesElement from './ranges.element';
import TracesElement from './traces.element';
import Vector3 from '../../../models/vector3';
import SwitchElement from '../../elements/switch.element';
import PanelElement from '../../elements/panel.element';
import TargetElement from './target.element';
import ZoomElement from './zoom.element';
import ColorPalette from '../../colorPalette';

interface RadarPropsModel {
    x: number,
    y: number,
    direction: Vector3,
}

interface RadarStateModel {
    enableDirectionsOverlay: boolean,
    enableRangesOverlay: boolean,
    enableWeaponsOverlay: boolean,
}

class RadarWidget extends React.Component<RadarPropsModel, RadarStateModel> {
    constructor(props: any) {
        super(props);
        this.state = {
            enableDirectionsOverlay: true,
            enableRangesOverlay: true,
            enableWeaponsOverlay: false,
        };

        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
        this.toggleWeaponsOverlay = this.toggleWeaponsOverlay.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                <TargetElement x={100} y={70}/>

                <g transform="translate(500 500)">
                    <circle
                        cx="0" cy="0" r="460"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    />
                    <RangesElement visible={this.state.enableRangesOverlay}/>
                    <DirectionsOverlay r={460} visible={this.state.enableDirectionsOverlay}/>
                    <TracesElement size={400} direction={this.props.direction}/>
                    <use href="/images/icons.svg#icon-ship" x="-6" y="-6"/>
                </g>

                <ZoomElement x={900} y={920}/>

                <g transform="translate(100 910)">
                    <g transform="translate(-60 0)">
                        <g transform="translate(-25 -25)">
                            <SwitchElement
                                x={0} y={0}
                                width={50} height={50} fontSize={1.25}
                                onClick={this.toggleRangesOverlay}
                                toggled={this.state.enableRangesOverlay}
                            >RNG</SwitchElement>
                        </g>
                    </g>
                    <g transform="translate(-25 -25)">
                        <SwitchElement
                            x={0} y={0}
                            width={50} height={50} fontSize={1.25}
                            onClick={this.toggleDirectionsOverlay}
                            toggled={this.state.enableDirectionsOverlay}
                        >SEC</SwitchElement>
                    </g>
                    <g transform="translate(60 0)">
                        <g transform="translate(-25 -25)">
                            <SwitchElement
                                x={0} y={0}
                                width={50} height={50} fontSize={1.25}
                                enabled={false}
                                onClick={this.toggleWeaponsOverlay}
                                toggled={this.state.enableWeaponsOverlay}
                            >WPN</SwitchElement>
                        </g>
                    </g>
                </g>
            </PanelElement>
        );
    }

    private toggleDirectionsOverlay() {
        this.setState({
            ...this.state,
            enableDirectionsOverlay: !this.state.enableDirectionsOverlay
        });
    }

    private toggleRangesOverlay() {
        this.setState({
            ...this.state,
            enableRangesOverlay: !this.state.enableRangesOverlay
        });
    }

    private toggleWeaponsOverlay() {
        this.setState({
            ...this.state,
            enableWeaponsOverlay: !this.state.enableWeaponsOverlay
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        direction: SpaceshipSelectors.getDirection(state),
    };
};

export default connect(mapStateToProps)(RadarWidget);
