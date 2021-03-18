import * as React from 'react';
import {connect} from 'react-redux';
import Marker from '../../models/marker';
import Vector3 from '../../models/vector3';
import Coords from '../../lib/coords';
import SvgTransforms from '../../lib/svg-transforms';
import BearingBezel from '../elements/bearingBezel';
import DirectionsOverlay from '../elements/directionsOverlay';
import Display from '../elements/display';
import RangesOverlay from '../elements/rangesOverlay';
import RoundButton from '../elements/roundButton';
import EntitiesOverlay from '../elements/entitiesOverlay';
import SpaceshipSelectors from '../../store/spaceship/spaceship.selectors';
import {SensorsModuleModel} from '../../modules/sensors-module.model';
import {SensorsTraceModel} from '../../modules/sensors-trace.model';

const RadarRanges = [10000, 7500, 5000, 2000, 1000];

interface RadarProps {
    x: number,
    y: number,
    position: Vector3,
    direction: Vector3,
    sensorsModule: SensorsModuleModel,
}

interface RadarState {
    zoomLevel: number,
    enableDirectionsOverlay: boolean,
    enableRangesOverlay: boolean,
    enableWeaponsOverlay: boolean,
}

class Radar extends React.Component<RadarProps, RadarState> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            zoomLevel: 0,
            enableDirectionsOverlay: true,
            enableRangesOverlay: true,
            enableWeaponsOverlay: false,
        };
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);

        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
        this.toggleWeaponsOverlay = this.toggleWeaponsOverlay.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    render() {
        const radarRange = RadarRanges[this.state.zoomLevel];
        const scale = 440 / radarRange;
        const markers = this.createMarkers(
            this.props.sensorsModule?.traces ?? [],
            this.props.position,
            scale
        );

        return (
            <g transform={this.translation}>
                <BearingBezel rotation={this.props.direction.y}/>
                <RangesOverlay range={radarRange} visible={this.state.enableRangesOverlay}/>
                <DirectionsOverlay visible={this.state.enableDirectionsOverlay}/>
                <EntitiesOverlay rotation={this.props.direction.y} markers={markers}/>
                <use href="#icon-ship" x="-6" y="-6"/>

                <g transform="translate(-420 420)">
                    <RoundButton
                        x={-40} y={-120}
                        onClick={this.toggleDirectionsOverlay}
                        toggled={this.state.enableDirectionsOverlay}
                    >DIR</RoundButton>
                    <RoundButton
                        x={30} y={-30}
                        onClick={this.toggleRangesOverlay}
                        toggled={this.state.enableRangesOverlay}
                    >RNG</RoundButton>
                    <RoundButton
                        x={120} y={40}
                        onClick={this.toggleWeaponsOverlay}
                        toggled={this.state.enableWeaponsOverlay}
                    >WPN</RoundButton>
                </g>

                <g transform="translate(420 420)">
                    <RoundButton
                        x={40} y={-120} fontSize={3}
                        onClick={this.zoomIn}
                    >+</RoundButton>
                    <Display title="radar range" subtitle={radarRange <= 1000 ? 'meters' : 'kilometers'}>
                        {radarRange <= 1000 ? radarRange : radarRange / 1000}
                    </Display>
                    <RoundButton
                        x={-120} y={40} fontSize={3}
                        onClick={this.zoomOut}
                    >-</RoundButton>
                </g>
            </g>
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

    private zoomIn() {
        this.setState({
            ...this.state,
            zoomLevel: Math.min(this.state.zoomLevel + 1, RadarRanges.length),
        });
    }

    private zoomOut() {
        this.setState({
            ...this.state,
            zoomLevel: Math.max(this.state.zoomLevel - 1, 0),
        });
    }

    private createMarkers(traces: SensorsTraceModel[], shipPosition: Vector3, scale: number): Marker[] {
        return traces.map((trace: SensorsTraceModel) => {
            const markerPosition = Coords.scale(Coords.translateOrigin(trace.position, shipPosition), scale);
            return {
                id: trace.id,
                x: markerPosition.x,
                y: markerPosition.y,
                text: trace.callSign
            };
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        position: SpaceshipSelectors.getPosition(state),
        direction: SpaceshipSelectors.getDirection(state),
        sensorsModule: SpaceshipSelectors.getModuleByType(state, 'module.sensors') as SensorsModuleModel
    };
};

export default connect(mapStateToProps)(Radar);
