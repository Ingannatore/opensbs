import * as React from 'react';
import {connect} from "react-redux";
import Selectors from "../../store/selectors";
import Vector3 from "../../store/models/vector3";
import Container from "../../elements/container";
import Bezel from "../../elements/bezel";
import Button from "../../elements/button";
import Directions from "../../elements/directions";
import Ranges from "../../elements/ranges";
import RangeDisplay from "../../elements/range-display";
import Actions from "./actions";
import {RadarState} from "./state";

interface RadarComponentProps {
    dispatch: any,
    x: number,
    y: number,
    size: number,
    radar: RadarState,
    rotation: Vector3
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
        return (
            <Container x={this.props.x} y={this.props.y} size={this.props.size}>
                <Bezel size={450} stroke={'none'} rotation={this.props.rotation.y} interval={3} majorInterval={15} fontSize={1}/>

                {this.props.radar.enableDirectionLines && (
                    <Directions size={440}/>
                )}

                {this.props.radar.enableRangeCircles && (
                    <Ranges size={440} distance={this.props.radar.radarRange} showTextes={this.props.radar.enableRangeTexts}/>
                )}

                <circle cx="0" cy="0" r="440" stroke="#33393d" fill="none" strokeWidth="1"/>
                <path d="M 0 -6 L 6 6 L 0 3 L -6 6 Z" stroke="white" strokeWidth="1" fill="white"/>

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
    return {
        rotation: Selectors.selectRotation(state),
        radar: state.radar
    };
};

export default connect(mapStateToProps)(Radar);
