import React, {Component} from 'react';
import Container from "./container";
import Text from "./text";

class Button extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.children !== 'string') {
            throw "The content of a Button component must be a string";
        }

        this.rotation = `rotate(${this.props.rotation || 0})`;
        this.textRotation = `rotate(${+(this.props.rotation || 0) * -1})`;
    }

    render() {
        let textFill = this.props.toggled ? 'black' : '#c0daf1';
        return (
            <g style={{cursor: 'pointer'}} transform={this.rotation} onClick={this.props.onClick}>
                <Container id={this.props.id} x={this.props.x} y={this.props.y} size={this.props.size} outerStroke="#33393d" innerStroke="#c0daf1">
                    {this.props.toggled &&
                        <circle cx="0" cy="0" r={+this.props.size - 6} stroke="none" fill="#c0daf1" opacity=".8"/>
                    }
                    <Text size={this.props.fontSize} fill={textFill} bold={this.props.toggled} transform={this.textRotation}>
                        {this.props.children}
                    </Text>
                </Container>
            </g>
        );
    }
}

Button.defaultProps = {
    fontSize: 1,
    bold: false,
    rotation: ''
};

export default Button;
