import * as React from 'react';
import {connect} from 'react-redux';
import Selectors from '../../store/selectors';
import Vector3 from '../../models/vector3';
import Container from '../../elements/container';
import Bezel from '../../elements/bezel';
import Button from '../../elements/button';
import Directions from '../../elements/directions';
import Ranges from '../../elements/ranges';
import RangeDisplay from '../../elements/range-display';
import {RadarState} from './state';
import Actions from './actions';
import Entity from '../../models/entity';
import EntitiesOverlay from '../../elements/entities-overlay';

interface RadarComponentProps {
    dispatch: any,
    x: number,
    y: number,
    size: number,
    radar: RadarState,
    position: Vector3,
    rotation: Vector3,
    entities: Entity[]
}

class Radar extends React.Component<RadarComponentProps, {}> {
    public static defaultProps = {
        size: 500
    };

    constructor(props: RadarComponentProps) {
        super(props);

        this.toggleDirectionLinesHandler = this.toggleDirectionLinesHandler.bind(this);
        this.toggleRangeCirclesHandler = this.toggleRangeCirclesHandler.bind(this);
        this.toggleRangeTextsHandler = this.toggleRangeTextsHandler.bind(this);
        this.toggleWeaponsArcsHandler = this.toggleWeaponsArcsHandler.bind(this);
        this.radarZoomInHandler = this.radarZoomInHandler.bind(this);
        this.radarZoomOutHandler = this.radarZoomOutHandler.bind(this);
    }

    public render() {
        const innerSize = this.props.size - 60;
        return (
            <Container x={this.props.x} y={this.props.y} size={this.props.size}>
                {this.props.radar.enableDirectionLines && (
                    <Directions size={innerSize}/>
                )}

                {this.props.radar.enableRangeCircles && (
                    <Ranges
                        size={innerSize} distance={this.props.radar.radarRange}
                        showTextes={this.props.radar.enableRangeTexts}
                    />
                )}

                <EntitiesOverlay
                    range={this.props.radar.radarRange}
                    size={innerSize}
                    origin={this.props.position}
                    rotation={this.props.rotation}
                    entities={this.props.entities}
                />

                <circle cx="0" cy="0" r={this.props.size - 33} stroke="#070d0f" fill="none" strokeWidth="54"/>
                <Bezel
                    size={this.props.size - 50} stroke={'none'} rotation={this.props.rotation.y}
                    interval={3} majorInterval={15} fontSize={1}
                />
                <circle cx="0" cy="0" r={innerSize} stroke="#33393d" fill="none" strokeWidth="1"/>

                <use href="#icon-ship"/>

                <Button
                    x={0} y={542} rotation={60}
                    toggled={this.props.radar.enableDirectionLines}
                    onClick={this.toggleDirectionLinesHandler}
                >DIR</Button>
                <Button
                    x={0} y={542} rotation={50}
                    toggled={this.props.radar.enableRangeCircles}
                    onClick={this.toggleRangeCirclesHandler}
                >RNG</Button>
                <Button
                    x={0} y={542} rotation={40}
                    toggled={this.props.radar.enableRangeTexts}
                    onClick={this.toggleRangeTextsHandler}
                >TXT</Button>
                <Button
                    x={0} y={542} rotation={30}
                    toggled={this.props.radar.enableWeaponsArcs}
                    onClick={this.toggleWeaponsArcsHandler}
                >WPN</Button>

                <RangeDisplay x={420} y={420} title={'radar range'}>
                    {this.props.radar.radarRange}
                </RangeDisplay>
                <Button
                    x={0} y={542} fontSize={2} rotation={-56}
                    onClick={this.radarZoomInHandler}
                >-</Button>
                <Button
                    x={0} y={542} fontSize={2} rotation={-34}
                    onClick={this.radarZoomOutHandler}
                >+</Button>
            </Container>
        );
    }

    private toggleDirectionLinesHandler() {
        this.props.dispatch(Actions.toggleDirectionsLines());
    }

    private toggleRangeCirclesHandler() {
        this.props.dispatch(Actions.toggleRangeCircles());
    }

    private toggleRangeTextsHandler() {
        this.props.dispatch(Actions.toggleRangeTexts());
    }

    private toggleWeaponsArcsHandler() {
        this.props.dispatch(Actions.toggleWeaponsArcs());
    }

    private radarZoomInHandler() {
        this.props.dispatch(Actions.zoomIn());
    }

    private radarZoomOutHandler() {
        this.props.dispatch(Actions.zoomOut());
    }
}

const mapStateToProps = (state: any) => {
    const shipPosition = Selectors.selectShipPosition(state);
    const radarState = state.radar;

    return {
        position: shipPosition,
        rotation: Selectors.selectShipRotation(state),
        entities: Selectors.selectEntitiesByDistance(state, shipPosition, radarState.radarRange),
        radar: radarState
    };
};

export default connect(mapStateToProps)(Radar);
