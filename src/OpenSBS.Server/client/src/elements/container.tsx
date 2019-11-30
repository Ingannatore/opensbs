import * as React from 'react';

interface ContainerComponentProps {
    x: number,
    y: number,
    size: number,
    outerStroke: string,
    innerStroke: string,
    onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}

export default class Container extends React.Component<ContainerComponentProps, {}> {
    private readonly innerRadius: number;
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        outerStroke: '#36424a',
        innerStroke: '#2a363c'
    };

    constructor(props: ContainerComponentProps) {
        super(props);
        this.innerRadius = +this.props.size - 4;
        this.translation = `translate(${this.props.x} ${this.props.y})`;
    }

    public render() {
        return (
            <g transform={this.translation} onClick={this.props.onClick}>
                <circle cx="0" cy="0" r={this.props.size} stroke="none" fill="#070d0f"/>
                <circle cx="0" cy="0" r={this.props.size} stroke={this.props.outerStroke} fill="none"/>
                <circle cx="0" cy="0" r={this.innerRadius} stroke={this.props.innerStroke} fill="none"/>
                {this.props.children}
            </g>
        );
    }
}
