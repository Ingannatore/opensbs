import React, {Component} from 'react';

class Box extends Component {
    constructor(props) {
        super(props);
        this.x = - (+this.props.width / 2);
        this.y = - (+this.props.height / 2);
        this.innerWidth = +this.props.width - 8;
        this.innerHeight = +this.props.height - 8;
        this.translation = `translate(${this.props.x || 0} ${this.props.y || 0})`;
    }

    render() {
        return (
            <g id={this.props.id} transform={this.translation}>
                <rect x={this.x} y={this.y} width={this.props.width} height={this.props.height} stroke="none" fill="#070d0f"/>
                <rect x={this.x} y={this.y} width={this.props.width} height={this.props.height} stroke={this.props.outerStroke} fill="none" />
                <rect x={this.x + 4} y={this.y + 4} width={this.innerWidth} height={this.innerHeight} stroke={this.props.innerStroke} fill="none" />
                {this.props.children}
            </g>
        );
    }
}

Box.defaultProps = {
    outerStroke: '#36424a',
    innerStroke: '#2a363c'
};

export default Box;
