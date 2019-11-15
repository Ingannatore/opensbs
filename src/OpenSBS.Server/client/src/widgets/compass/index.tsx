import * as React from 'react';
import {connect} from "react-redux";
import Container from "../../elements/container";
import Display from "../../elements/display";
import Bezel from "../../elements/bezel";

interface CompassComponentProps {
    x: number,
    y: number,
    bearing: number
}

class Compass extends React.Component<CompassComponentProps, {}> {
    public render() {
        const textBearing = ('000' + Math.trunc(this.props.bearing)).slice(-3);

        return (
            <Container size={210} x={this.props.x} y={this.props.y}>
                <Display size={120} title="bearing" subtitle="degrees">{textBearing}</Display>
                <line x1="0" y1="-121" x2="0" y2="-215" stroke="#33393d"/>
                <Bezel size={140} rotation={this.props.bearing}/>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        bearing: state.stateReducer['ship.bearing'] || '0'
    }
};

export default connect(mapStateToProps)(Compass);
