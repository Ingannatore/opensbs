import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import ColorPalette from 'svg/colorPalette';

interface GridOverlayProps {
    x: number,
    y: number,
    visible: boolean,
}

export default class GridOverlay extends React.Component<GridOverlayProps, {}> {
    private readonly translation: string;
    private readonly gridValues: number[] = Array.from(
        {length: 4},
        (value, key) => (key + 1) * 84
    )
    private readonly labels: string[][] = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
        ['C1', 'C2', 'C3', 'C4', 'C5'],
        ['D1', 'D2', 'D3', 'D4', 'D5'],
        ['E1', 'E2', 'E3', 'E4', 'E5'],
    ];

    public static defaultProps = {
        x: 0,
        y: 0,
        visible: true,
    };

    constructor(props: GridOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <g transform={this.translation}>
                {this.renderGrid()}
                {this.renderLabels()}
            </g>
        );
    }

    private renderGrid() {
        const horizontalLines = this.gridValues.map(value => <line
            key={'sectors-grid-horizontal-' + value}
            x1="0" y1={value} x2="420" y2={value}
            stroke={ColorPalette.MUTE} strokeWidth="1" strokeDasharray="2 4"
        />);

        const verticalLines = this.gridValues.map(value => <line
            key={'sectors-grid-vertical-' + value}
            x1={value} y1="0" x2={value} y2="420"
            stroke={ColorPalette.MUTE} strokeWidth="1" strokeDasharray="2 4"
        />);

        return [...horizontalLines, ...verticalLines];
    }

    private renderLabels() {
        const labels = [];

        for (let y = 0; y < this.labels.length; y++) {
            for (let x = 0; x < this.labels[y].length; x++) {
                labels.push(
                    <text
                        key={'sectors-grid-label-' + this.labels[y][x]}
                        x={x * 84 + 4} y={y * 84 + 5}
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE}
                        className="hanging"
                    >{this.labels[y][x]}</text>
                )
            }
        }

        return labels;
    }
}
