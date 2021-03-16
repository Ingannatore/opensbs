import * as React from 'react';
import {connect} from 'react-redux';
import Marker from '../../models/marker';
import Vector3 from '../../models/vector3';
import Coords from '../../lib/coords';
import SvgTransforms from '../../lib/svg-transforms';
import ShipSelectors from '../../store/selectors/ship';
import WorldSelectors from '../../store/selectors/world';
import BearingBezel from '../elements/bearingBezel';
import DirectionsOverlay from '../elements/directionsOverlay';
import Display from '../elements/display';
import RangesOverlay from '../elements/rangesOverlay';
import RoundButton from '../elements/roundButton';
import EntitiesOverlay from '../elements/entitiesOverlay';
import SpaceThing from '../../models/space-thing';

const RadarRanges = [10000, 7500, 5000, 2000, 1000];

interface RadarProps {
    dispatch: any,
    x: number,
    y: number,
    shipPosition: Vector3,
    rotation: Vector3,
    entities: SpaceThing[],
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
        const markers = this.createMarkers(this.props.entities, this.props.shipPosition, scale);

        return (
            <g transform={this.translation}>
                <BearingBezel rotation={this.props.rotation.y}/>
                <RangesOverlay range={radarRange} visible={this.state.enableRangesOverlay}/>
                <DirectionsOverlay visible={this.state.enableDirectionsOverlay}/>
                <EntitiesOverlay rotation={this.props.rotation.y} markers={markers}/>
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

    private createMarkers(entities: SpaceThing[], shipPosition: Vector3, scale: number): Marker[] {
        return entities.map((entity: SpaceThing) => {
            const markerPosition = Coords.scale(Coords.translateOrigin(entity.position, shipPosition), scale);
            return {
                id: entity.id,
                x: markerPosition.x,
                y: markerPosition.y,
                text: entity.name
            };
        });
    }
}

const mapStateToProps = (state: any) => {
    const shipPosition = ShipSelectors.selectShipPosition(state);

    return {
        shipPosition: shipPosition,
        rotation: ShipSelectors.selectShipRotation(state),
        entities: WorldSelectors.selectEntitiesByDistance(state, shipPosition, 10000),
    };
};

export default connect(mapStateToProps)(Radar);
