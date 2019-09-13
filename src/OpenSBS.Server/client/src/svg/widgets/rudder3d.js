import React, {Component} from 'react'
import {connect} from "react-redux";
import Container from "../elements/container";
import Actions from "../../actions";

class Rudder3D extends Component {
    constructor(props) {
        super(props);

        this.state = { follow: false, px: 0, py: 0 };
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    render() {
        const translateRudder = `translate(${this.state.px}, ${this.state.py})`;
        return (
            <g onMouseDown={ this.mouseDownHandler } onMouseMove={ this.mouseMoveHandler } onMouseUp={ this.mouseUpHandler }>
                <Container id="widget-rudder" size="220" x={this.props.x} y={this.props.y}>
                    <line x1="0" y1="215" x2="0" y2="-215" stroke="#33393d" strokeWidth="1" strokeDasharray="2 4" />
                    <line x1="0" y1="215" x2="0" y2="-215" stroke="#33393d" strokeWidth="1" transform="rotate(45)" strokeDasharray="2 4" />
                    <line x1="0" y1="215" x2="0" y2="-215" stroke="#33393d" strokeWidth="1" transform="rotate(90)" strokeDasharray="2 4" />
                    <line x1="0" y1="215" x2="0" y2="-215" stroke="#33393d" strokeWidth="1" transform="rotate(135)" strokeDasharray="2 4" />

                    <circle cx="0" cy="0" r="60" stroke="none" fill="black" opacity=".4"/>
                    <g transform={translateRudder}>
                        <circle cx="0" cy="0" r="60" stroke="#33393d" strokeWidth="2" fill="#122127" />
                        <circle cx="0" cy="0" r="56" stroke="#85888a" fill="none" />
                        <text x="0" y="0" textAnchor="middle" fontSize="1.4rem" fill="#ffffff">rudder</text>
                    </g>
                </Container>
            </g>
        );
    }

    mouseDownHandler(event) {
        this.getRudderPosition(event);
        this.setState({
            follow: true
        });
    }

    mouseMoveHandler(event) {
        if (!this.state.follow) {
            return;
        }

        this.getRudderPosition(event);
    }

    mouseUpHandler() {
        this.setState({follow: false, px: 0, py: 0});
        this.props.dispatch(Actions.updateState('ship.rudder', 0))
    }

    getRudderPosition(event) {
        const angle = Math.atan2(
            event.clientY - this.props.y,
            event.clientX - this.props.x
        );

        const px = 150 * Math.cos(angle);
        this.dispatchUpdateState(px);

        this.setState({
            px: px,
            py: 150 * Math.sin(angle)
        });
    }

    dispatchUpdateState(px) {
        if (px > 0) {
            this.props.dispatch(Actions.updateState('ship.rudder', +1))
        }
        else if (px < 0) {
            this.props.dispatch(Actions.updateState('ship.rudder', -1))
        }
    }
}

const mapStateToProps = state => {
    return {
        rudder: state['ship.rudder'] || '0'
    }
};

export default connect(mapStateToProps)(Rudder3D);
