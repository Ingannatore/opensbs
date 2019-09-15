import React, {Component} from 'react';
import Container from "./container";
import Text from "./text";

class Button extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.children !== 'string') {
            throw "The content of a Button component must be a string";
        }
    }

    render() {
        return (
            <g style={{cursor: 'pointer'}} onClick={this.props.onClick}>
                <Container id={this.props.id} x={this.props.x} y={this.props.y} size={this.props.size} outerStroke="#33393d" innerStroke="#c0daf1">
                    <Text size={this.props.fontSize} fill="#c0daf1">{this.props.children}</Text>
                </Container>
            </g>
        );
    }
}

Button.defaultProps = {
    fontSize: 1
};

export default Button;
