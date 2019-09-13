import React, {Component} from 'react';
import Container from "./container";
import Text from "./text";

class Display extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.children !== 'string') {
            throw "The content of a Display component must be a string";
        }

        this.titleY = (-props.size / 2 ) - 10;
        this.subtitleY = +props.size / 2;
        this.titleSize = (+props.size / 86).toFixed(1);
        this.valueSize = (+props.size / 20).toFixed(1);
        this.subtitleSize = (+props.size / 120).toFixed(1);
    }

    render() {
        return (
            <Container id={this.props.id} x={this.props.x} y={this.props.y} size={this.props.size} outerStroke="#33393d" innerStroke="#85888a">
                <Text x="0" y={this.titleY} size={this.titleSize}>{this.props.title}</Text>
                <Text size={this.valueSize} fill="#ffffff">{this.props.children}</Text>
                <Text x="0" y={this.subtitleY} size={this.subtitleSize}>{this.props.subtitle}</Text>
            </Container>
        );
    }
}

Display.defaultProps = {
    x: '0',
    y: '0'
};

export default Display;
