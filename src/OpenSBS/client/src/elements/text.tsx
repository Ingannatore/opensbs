import * as React from 'react';
import CSS from 'csstype';

interface TextComponentProps {
    x: number,
    y: number,
    size: number,
    fill: string,
    textAnchor: string,
    transform: string,
    bold: boolean
}

export default class Text extends React.Component<TextComponentProps, {}> {
    private readonly fontSize: string;
    private readonly style: CSS.Properties;

    public static defaultProps = {
        x: '0',
        y: '0',
        fill: '#76797c',
        textAnchor: 'middle',
        transform: '',
        bold: false
    };

    constructor(props: TextComponentProps) {
        super(props);

        this.fontSize = this.props.size + "rem";
        this.style = {
            'fontWeight': this.props.bold ? 'bold' : 'normal'
        }
    }

    public render() {
        return (
            <text
                x={this.props.x}
                y={this.props.y}
                textAnchor={this.props.textAnchor}
                fontSize={this.fontSize}
                fill={this.props.fill}
                transform={this.props.transform}
                style={this.style}
            >
                {this.props.children}
            </text>
        );
    }
}
