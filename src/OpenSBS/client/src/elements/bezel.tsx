import * as React from 'react';
import SvgTransform from '../lib/svg-transform';

interface BezelComponentProps {
    x: number,
    y: number,
    size: number,
    stroke: string,
    rotation: number,
    interval: number,
    majorInterval: number,
    fontSize: number,
    fromAngle: number,
    toAngle: number,
    labels: string
}

export default class Bezel extends React.Component<BezelComponentProps, {}> {
    private readonly minorMarkerEnd: number;
    private readonly majorMarkerEnd: number;
    private readonly markerStart: number;
    private readonly textPosition: number;
    private readonly labels: string[] | null;

    public static defaultProps = {
        x: 0,
        y: 0,
        stroke: '#c0daf1',
        interval: 10,
        majorInterval: 30,
        fontSize: 1.4,
        fromAngle: 0,
        toAngle: 360,
        labels: ''
    };

    constructor(props: BezelComponentProps) {
        super(props);

        this.markerStart = -this.props.size;
        this.minorMarkerEnd = this.markerStart - 10;
        this.majorMarkerEnd = this.markerStart - 18;
        this.textPosition = this.majorMarkerEnd - 14;
        this.labels = this.props.labels ? this.props.labels.split(' ') : null;
    }

    public render(): JSX.Element {
        const rotation = SvgTransform.rotate(-this.props.rotation);

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
        let numberOfMajorMarker = 0;
        for (let i = this.props.fromAngle; i <= this.props.toAngle; i += this.props.interval) {
            if (this.props.fromAngle === 0 && this.props.toAngle === 360 && i === 360) {
                continue;
            }

            const rotation = SvgTransform.rotate(i);
            if ((i % this.props.majorInterval) === 0) {
                const markerValue = this.labels ? this.labels[numberOfMajorMarker] : i;
                markers.push(
                    <line
                        key={`linemarker${i}`}
                        x1="0" y1={this.markerStart}
                        x2="0" y2={this.majorMarkerEnd}
                        stroke="#c0daf1" strokeWidth="2"
                        transform={rotation}
                    />
                );
                markers.push(
                    <text
                        key={`numbermarker${i}`}
                        x="0"
                        y={this.textPosition}
                        textAnchor="middle"
                        fontSize={this.props.fontSize + 'rem'}
                        transform={rotation}
                        fill="#76797c"
                    >{markerValue}</text>
                );

                numberOfMajorMarker += 1;
            } else {
                markers.push(
                    <line
                        key={`linemarker${i}`}
                        x1="0" y1={this.markerStart}
                        x2="0" y2={this.minorMarkerEnd}
                        stroke="#c0daf1" strokeWidth="1"
                        transform={rotation}
                    />
                );
            }
        }

        return markers;
    }
}
