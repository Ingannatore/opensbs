import React, {Component} from 'react';

class Text extends Component {
    constructor(props) {
        super(props);

        this.fontSize = this.props.size + "rem";
    }

    render() {
        return (
            <text x={this.props.x} y={this.props.y} textAnchor={this.props.anchor} fontSize={this.fontSize} fill={this.props.fill} transform={this.props.transform}>
                {this.props.children}
            </text>
        );
    }
}

Text.defaultProps = {
    x: '0',
    y: '0',
    fill: '#76797c',
    anchor: 'middle',
    transform: ''
};

export default Text;
