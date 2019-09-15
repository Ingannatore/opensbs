import React, {Component} from 'react';

class Container extends Component {
    constructor(props) {
        super(props);
        this.innerRadius = +this.props.size - 4;
        this.translation = `translate(${this.props.x || 0} ${this.props.y || 0})`;
    }

    render() {
        return (
            <g id={this.props.id} transform={this.translation}>
                <circle cx="0" cy="0" r={this.props.size} stroke="none" fill="#070d0f"/>
                <circle cx="0" cy="0" r={this.props.size} stroke={this.props.outerStroke} fill="none"/>
                <circle cx="0" cy="0" r={this.innerRadius} stroke={this.props.innerStroke} fill="none"/>
                {this.props.children}
            </g>
        );
    }
}

Container.defaultProps = {
    outerStroke: '#36424a',
    innerStroke: '#2a363c'
};

export default Container;
