import * as React from 'react';

interface BezelComponentProps {
    x: number,
    y: number,
    size: number,
    stroke: string,
    rotation: number,
    interval: number,
    majorInterval: number,
    fontSize: number
}

export default class Bezel extends React.Component<BezelComponentProps, {}> {
    private readonly minorMarkerEnd: number;
    private readonly majorMarkerEnd: number;
    private readonly markerStart: number;
    private readonly textPosition: number;

    public static defaultProps = {
        x: 0,
        y: 0,
        stroke: '#c0daf1',
        interval: 10,
        majorInterval: 30,
        fontSize: 1.4
    };

    constructor(props: BezelComponentProps) {
        super(props);

        this.markerStart = -this.props.size;
        this.minorMarkerEnd = this.markerStart - 10;
        this.majorMarkerEnd = this.markerStart - 18;
        this.textPosition = this.majorMarkerEnd - 14;
    }

    public render(): JSX.Element {
        const rotation = `rotate(${-(Math.trunc(this.props.rotation))}, 0, 0)`;

        return (
            <g>
                <circle
                    cx={this.props.x}
                    cy={this.props.y}
                    r={this.props.size}
                    stroke={this.props.stroke}
                    strokeWidth="2"
                    fill="none"
                />
                <g transform={rotation}>
                    {this.renderMarkers()}
                </g>
            </g>
        );
    }

    private renderMarkers(): JSX.Element[] {
        const markers = [];
        for (let i = 0; i < 360; i += this.props.interval) {
            if ((i % this.props.majorInterval) === 0) {
                markers.push(
                    <line
                        key={`linemarker${i}`}
                        x1="0" y1={this.markerStart}
                        x2="0" y2={this.majorMarkerEnd}
                        stroke="#c0daf1" strokeWidth="2"
                        transform={`rotate(${i}, 0, 0)`}
                    />
                );
                markers.push(
                    <text
                        key={`numbermarker${i}`}
                        x="0"
                        y={this.textPosition}
                        textAnchor="middle"
                        fontSize={this.props.fontSize + 'rem'}
                        transform={`rotate(${i}, 0, 0)`}
                        fill="#76797c"
                    >{i}</text>
                );
            } else {
                markers.push(
                    <line
                        key={`linemarker${i}`}
                        x1="0" y1={this.markerStart}
                        x2="0" y2={this.minorMarkerEnd}
                        stroke="#c0daf1" strokeWidth="1"
                        transform={`rotate(${i}, 0, 0)`}
                    />
                );
            }
        }

        return markers;
    }
}
