import * as React from 'react';
import Container from './container';
import Text from './text';

interface ButtonComponentProps {
    x: number,
    y: number,
    size: number,
    rotation: number,
    toggled: boolean,
    fontSize: number,
    onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}

export default class Button extends React.Component<ButtonComponentProps, {}> {
    private readonly rotation: string;
    private readonly textRotation: string;

    public static defaultProps = {
        fontSize: 1,
        bold: false,
        rotation: 0,
        size: 30,
        toggled: false
    };

    constructor(props: ButtonComponentProps) {
        super(props);

        this.rotation = `rotate(${this.props.rotation})`;
        this.textRotation = `rotate(${-(this.props.rotation)})`;
    }

    public render() {
        const textFill = this.props.toggled ? 'black' : '#c0daf1';
        return (
            <g style={{cursor: 'pointer'}} transform={this.rotation} onClick={this.props.onClick}>
                <Container x={this.props.x} y={this.props.y} size={this.props.size} outerStroke="#33393d" innerStroke="#c0daf1">
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
