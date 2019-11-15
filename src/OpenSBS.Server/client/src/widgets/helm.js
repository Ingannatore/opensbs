import React, {Component} from 'react'
import {connect} from "react-redux";
import Actions from "../store/actions";
import Button from "../elements/button";
import Container from "../elements/container";

class Helm extends Component {
    constructor(props) {
        super(props);

        this.state = {distance: 0, rotation: 0};
        this.onClick = this.onClick.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <g onClick={this.onClick} style={{cursor: 'crosshair'}}>
                <Container id="widget-helm" size="210" x={this.props.x} y={this.props.y}>
                    <line x1="0" y1="205" x2="0" y2="-205" stroke="#33393d" strokeWidth="1" transform="rotate(45)"/>
                    <line x1="0" y1="205" x2="0" y2="-205" stroke="#33393d" strokeWidth="1" transform="rotate(-45)"/>

                    <circle cx="0" cy="0" r="184" stroke="#122127" fill="none" strokeDasharray="4 8"/>
                    <circle cx="0" cy="0" r="140" stroke="#122127" fill="none" strokeDasharray="4 8"/>
                    <circle cx="0" cy="0" r="96" stroke="#122127" fill="none" strokeDasharray="4 8"/>
                    <circle cx="0" cy="0" r="52" stroke="#122127" fill="none" strokeDasharray="4 8"/>

                    <Button x="0" y="0" size="30" fontSize="1" onClick={this.reset}>zero</Button>

                    {this.renderMarker()}
                </Container>
            </g>
        );
    }

    renderMarker() {
        if (this.state.distance === 0 && this.state.rotation === 0) {
            return;
        }

        let transform = `translate(0 -${this.state.distance}) rotate(${this.state.rotation} 0 ${this.state.distance})`;
        return (
            <g transform={transform}>
                <circle cx="0" cy="0" r="12" stroke="none" fill="#070d0f"/>
                <circle cx="0" cy="0" r="12" stroke="#36424a" fill="none"/>
                <circle cx="0" cy="0" r="8" stroke="#2a363c" fill="#aaadae"/>
            </g>
        );
    }

    onClick(event) {
        const deltaX = event.clientX - this.props.x;
        const deltaY = event.clientY - this.props.y;
        const distance = Math.round(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
        const angle = ((180 / Math.PI) * Math.atan2(deltaX, -deltaY));

        const steps = [30, 74, 118, 162, 206];
        for (let i = 4; i > 0; i--) {
            if (steps[i - 1] < distance && distance <= steps[i]) {
                this.setState({
                    distance: 52 + ((i - 1) * 44),
                    rotation: angle
                });
                this.dispatchUpdateState(angle);
                break;
            }
        }
    }

    reset() {
        this.setState({
            distance: 0,
            rotation: 0
        });
        this.props.dispatch(Actions.updateState('ship.rudder', 0))
    }

    dispatchUpdateState(angle) {
        if (angle > 0) {
            this.props.dispatch(Actions.updateState('ship.rudder', +1))
        } else if (angle < 0) {
            this.props.dispatch(Actions.updateState('ship.rudder', -1))
        }
    }
}

const mapStateToProps = state => {
    return {
        rudder: state['ship.rudder'] || '0'
    }
};

export default connect(mapStateToProps)(Helm);
