import * as React from 'react';
import {connect} from 'react-redux';
import Entity from '../../../models/entity';
import Marker from '../../../models/marker';
import Vector3 from '../../../models/vector3';
import Coords from '../../../lib/coords';
import SvgTransforms from '../../../lib/svg-transforms';
import ShipSelectors from '../../../store/selectors/ship';
import WorldSelectors from '../../../store/selectors/world';
import BearingBezel from '../../elements/bearingBezel';
import DirectionsOverlay from '../../elements/directionsOverlay';
import Display from '../../elements/display';
import RangesOverlay from '../../elements/rangesOverlay';
import RoundButton from '../../elements/roundButton';
import EntitiesOverlay from '../../elements/entitiesOverlay';
import {RadarRanges, RadarState} from './state';
import Actions from './actions';

interface RadarProps {
    dispatch: any,
    x: number,
    y: number,
    range: number,
    shipPosition: Vector3,
    rotation: Vector3,
    radar: RadarState,
    entities: Entity[],
}

class Radar extends React.Component<RadarProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: RadarProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
        this.toggleWeaponsOverlay = this.toggleWeaponsOverlay.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    render() {
        const scale = 440 / this.props.range;
        const markers = this.createMarkers(this.props.entities, this.props.shipPosition, scale);

        return (
            <g transform={this.translation}>
                <BearingBezel rotation={this.props.rotation.y}/>
                <RangesOverlay range={this.props.range} visible={this.props.radar.enableRangesOverlay}/>
                <DirectionsOverlay visible={this.props.radar.enableDirectionsOverlay}/>
                <EntitiesOverlay rotation={this.props.rotation.y} markers={markers}/>
                <use href="#icon-ship" x="-6" y="-6"/>

                <g transform="translate(-420 420)">
                    <RoundButton
                        x={-40} y={-120}
                        onClick={this.toggleDirectionsOverlay}
                        toggled={this.props.radar.enableDirectionsOverlay}
                    >DIR</RoundButton>
                    <RoundButton
                        x={30} y={-30}
                        onClick={this.toggleRangesOverlay}
                        toggled={this.props.radar.enableRangesOverlay}
                    >RNG</RoundButton>
                    <RoundButton
                        x={120} y={40}
                        onClick={this.toggleWeaponsOverlay}
                        toggled={this.props.radar.enableWeaponsOverlay}
                    >WPN</RoundButton>
                </g>

                <g transform="translate(420 420)">
                    <RoundButton
                        x={40} y={-120} fontSize={3}
                        onClick={this.zoomIn}
                    >+</RoundButton>
                    <Display title="radar range" subtitle={this.props.range <= 1000 ? 'meters' : 'kilometers'}>
                        {this.props.range <= 1000 ? this.props.range : this.props.range / 1000}
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
        this.props.dispatch(Actions.toggleDirectionsOverlay());
    }

    private toggleRangesOverlay() {
        this.props.dispatch(Actions.toggleRangesOverlay());
    }

    private toggleWeaponsOverlay() {
        this.props.dispatch(Actions.toggleWeaponsOverlay());
    }

    private zoomIn() {
        this.props.dispatch(Actions.zoomIn());
    }

    private zoomOut() {
        this.props.dispatch(Actions.zoomOut());
    }

    private createMarkers(entities: Entity[], shipPosition: Vector3, scale: number): Marker[] {
        return entities.map((entity: Entity) => {
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
    const radarRange = RadarRanges[state.radar.zoomLevel];

    return {
        radar: state.radar,
        range: radarRange,
        shipPosition: shipPosition,
        rotation: ShipSelectors.selectShipRotation(state),
        entities: WorldSelectors.selectEntitiesByDistance(state, shipPosition, radarRange),
    };
};

export default connect(mapStateToProps)(Radar);
