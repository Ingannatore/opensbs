import * as React from 'react';
import Container from './container';
import Text from './text';

interface DisplayComponentProps {
    x: number,
    y: number,
    size: number,
    title: string,
    subtitle: string
}

export default class Display extends React.Component<DisplayComponentProps, {}> {
    private readonly titleY: number;
    private readonly subtitleY: number;
    private readonly titleSize: number;
    private readonly valueSize: number;
    private readonly subtitleSize: number;

    public static defaultProps = {
        x: 0,
        y: 0
    };

    constructor(props: DisplayComponentProps) {
        super(props);

        this.titleY = (-props.size / 2) - 5;
        this.subtitleY = +props.size / 2;
        this.titleSize = Math.round(+props.size / 86);
        this.valueSize = Math.round(+props.size / 20);
        this.subtitleSize = Math.round(+props.size / 120);
    }

    public render() {
        return (
            <Container x={this.props.x} y={this.props.y} size={this.props.size} outerStroke="#33393d" innerStroke="#85888a">
                <Text x={0} y={this.titleY} size={this.titleSize}>{this.props.title}</Text>
                <Text size={this.valueSize} fill="#ffffff">{this.props.children}</Text>
                <Text x={0} y={this.subtitleY} size={this.subtitleSize}>{this.props.subtitle}</Text>
            </Container>
        );
    }
}
