import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface CylinderElementProps {
    x: number,
    y: number,
    height: number,
    color: string,
    uom: string,
    labels: string,
    labelsPosition: string,
    ratio: number,
}

export default class CylinderElement extends React.Component<CylinderElementProps, {}> {
    private readonly translation: string;
    private readonly innerHeight: number;
    private readonly markerDeltaHeight: number;

    public static defaultProps = {
        color: ColorPalette.FILLER,
        uom: '%',
        labels: '80 60 40 20',
        labelsPosition: 'left',
    };

    constructor(props: CylinderElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.innerHeight = this.props.height - 6;
        this.markerDeltaHeight = this.innerHeight / 10;
    }

    public render() {
        const rectHeight = Math.round(this.innerHeight * this.props.ratio);
        const rectTop = this.innerHeight - rectHeight + 3;
        const labelStartX = this.props.labelsPosition === 'left' ? -4 : 24;
        const labelEndX = this.props.labelsPosition === 'left' ? -8 : 28;
        const textAnchor = this.props.labelsPosition === 'left' ? 'end' : 'start';

        return (
            <g transform={this.translation}>
                <rect
                    x="0" y="0"
                    width="20" height={this.props.height}
                    stroke={ColorPalette.MUTE_LIGHT}
                    rx="4" ry="4"
                />
                <rect
                    x="3" y={rectTop}
                    width="14" height={rectHeight}
                    fill={this.props.color}
                    rx="3" ry="3"
                />
                <g transform="translate(0 3)">
                    <line
                        x1={labelStartX} y1={this.markerDeltaHeight}
                        x2={labelEndX} y2={this.markerDeltaHeight}
                        stroke={ColorPalette.TEXT} strokeWidth="2"
                    />
                    <line
                        x1={labelStartX} y1={this.markerDeltaHeight * 3}
                        x2={labelEndX} y2={this.markerDeltaHeight * 3}
                        stroke={ColorPalette.TEXT} strokeWidth="2"
                    />
                    <line
                        x1={labelStartX} y1={this.markerDeltaHeight * 5}
                        x2={labelEndX} y2={this.markerDeltaHeight * 5}
                        stroke={ColorPalette.TEXT} strokeWidth="2"
                    />
                    <line
                        x1={labelStartX} y1={this.markerDeltaHeight * 7}
                        x2={labelEndX} y2={this.markerDeltaHeight * 7}
                        stroke={ColorPalette.TEXT} strokeWidth="2"
                    />
                    <line
                        x1={labelStartX} y1={this.markerDeltaHeight * 9}
                        x2={labelEndX} y2={this.markerDeltaHeight * 9}
                        stroke={ColorPalette.TEXT} strokeWidth="2"
                    />
                    <text
                        x={labelStartX} y="0"
                        fill={ColorPalette.TEXT}
                        fontSize="1rem" textAnchor={textAnchor}
                    >{this.props.uom}</text>
                    <text
                        x={labelStartX} y={this.markerDeltaHeight * 2}
                        fill={ColorPalette.TEXT}
                        fontSize="1rem" textAnchor={textAnchor}
                    >{this.props.labels.split(' ')[0]}</text>
                    <text
                        x={labelStartX} y={this.markerDeltaHeight * 4}
                        fill={ColorPalette.TEXT}
                        fontSize="1rem" textAnchor={textAnchor}
                    >{this.props.labels.split(' ')[1]}</text>
                    <text
                        x={labelStartX} y={this.markerDeltaHeight * 6}
                        fill={ColorPalette.TEXT}
                        fontSize="1rem" textAnchor={textAnchor}
                    >{this.props.labels.split(' ')[2]}</text>
                    <text
                        x={labelStartX} y={this.markerDeltaHeight * 8}
                        fill={ColorPalette.TEXT}
                        fontSize="1rem" textAnchor={textAnchor}
                    >{this.props.labels.split(' ')[3]}</text>
                </g>
            </g>
        );
    }
}
