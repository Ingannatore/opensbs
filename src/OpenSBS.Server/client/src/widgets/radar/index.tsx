import * as React from 'react';
import {connect} from "react-redux";
import Selectors from "../../store/selectors";
import Vector3 from "../../store/models/vector3";
import Container from "../../elements/container";
import Bezel from "../../elements/bezel";
import Button from "../../elements/button";
import Actions from "./actions";
import {RadarState} from "./state";
import Display from "../../elements/display";

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
    }

    public render() {
        return (
            <Container x={this.props.x} y={this.props.y} size={this.props.size}>
                <Bezel size={450} stroke={'none'} rotation={this.props.rotation.y} interval={3} majorInterval={15} fontSize={1}/>

                {this.props.radar.enableDirectionLines && (
                    <g>
                        <line x1="0" y1="-440" x2="0" y2="440" stroke="#2a363c" strokeWidth="1" strokeDasharray="2 4"/>
                        <line x1="0" y1="-440" x2="0" y2="440" stroke="#2a363c" strokeWidth="1" strokeDasharray="2 4" transform="rotate(45)"/>
                        <line x1="0" y1="-440" x2="0" y2="440" stroke="#2a363c" strokeWidth="1" strokeDasharray="2 4" transform="rotate(90)"/>
                        <line x1="0" y1="-440" x2="0" y2="440" stroke="#2a363c" strokeWidth="1" strokeDasharray="2 4" transform="rotate(135)"/>
                    </g>
                )}

                {this.props.radar.enableRangeCircles && (
                    <g>
                        <circle cx="0" cy="0" r="88" stroke="#122127" fill="none" strokeWidth="1"/>
                        <circle cx="0" cy="0" r="176" stroke="#122127" fill="none" strokeWidth="1"/>
                        <circle cx="0" cy="0" r="264" stroke="#122127" fill="none" strokeWidth="1"/>
                        <circle cx="0" cy="0" r="352" stroke="#122127" fill="none" strokeWidth="1"/>
                    </g>
                )}

                {this.props.radar.enableRangeTexts && (
                    <g>
                        <text x="84" y="-8" fontSize="1rem" fill="#76797c" textAnchor="end">2km</text>
                        <text x="172" y="-8" fontSize="1rem" fill="#76797c" textAnchor="end">4km</text>
                        <text x="260" y="-8" fontSize="1rem" fill="#76797c" textAnchor="end">6km</text>
                        <text x="348" y="-8" fontSize="1rem" fill="#76797c" textAnchor="end">8km</text>
                        <text x="436" y="-8" fontSize="1rem" fill="#76797c" textAnchor="end">10km</text>
                    </g>
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

                <Display x={420} y={420} size={80} title="radar range" subtitle="kilometers">10</Display>
                <Button x={0} y={542} fontSize={2} rotation={-60}>-</Button>
                <Button x={0} y={542} fontSize={2} rotation={-30}>+</Button>
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
}

const mapStateToProps = (state: any) => {
    return {
        rotation: Selectors.selectRotation(state),
        radar: state.radar
    };
};

export default connect(mapStateToProps)(Radar);
