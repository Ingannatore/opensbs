import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import Vector3 from '../../../models/vector3';
import ClientSelectors from '../../../store/client/clientSelectors';
import ColorPalette from '../../colorPalette';

interface GridOverlayElementProps {
    x: number,
    y: number,
    visible: boolean,
    mapScale: number,
    mapCenter: Vector3,
}

class GridOverlayElement extends React.Component<GridOverlayElementProps, {}> {
    private readonly size = 200000;
    private readonly numberOfSectors = 10;
    private readonly translation: string;
    private readonly metersPerSector: number;

    constructor(props: GridOverlayElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.metersPerSector = this.size / this.numberOfSectors;
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const scaledSize = this.size / this.props.mapScale;
        const halfScaledSize = scaledSize / 2;
        const deltaInterval = this.metersPerSector / this.props.mapScale;
        const gridIntervals = Array.from(
            {length: this.numberOfSectors - 1},
            (value, key) => (key - 4) * deltaInterval
        );

        const horizontals = gridIntervals.map(
            (value: number) => <line
                key={'h-grid-' + value}
                x1={-halfScaledSize} y1={value} x2={halfScaledSize} y2={value}
                stroke={ColorPalette.MUTE_DARK} strokeWidth="1"
            />
        );
        const verticals = gridIntervals.map(
            (value: number) => <line
                key={'v-grid-' + value}
                x1={value} y1={-halfScaledSize} x2={value} y2={halfScaledSize}
                stroke={ColorPalette.MUTE_DARK} strokeWidth="1"
            />
        );
        const labels = this.renderLabels(deltaInterval);

        const offset = SvgTransforms.translate(
            -this.props.mapCenter.x / this.props.mapScale,
            this.props.mapCenter.z / this.props.mapScale,
        );

        return (
            <g transform={this.translation} mask="url(#gridMask)">
                <g transform={offset}>
                    {horizontals}
                    {verticals}
                    {labels}
                </g>
            </g>
        );
    }

    private renderLabels(deltaInterval: number) {
        const fontSize = GridOverlayElement.getFontSize(this.props.mapScale);
        const textDeltaY = 6 + (fontSize * 2);
        const labelsIntervals = Array.from(
            {length: this.numberOfSectors},
            (value, key) => (key - 5) * deltaInterval
        );

        let labels = [];
        for (const yInterval of labelsIntervals) {
            const yLabel = yInterval / deltaInterval + 5;
            for (const xInterval of labelsIntervals) {
                const xLabel = String.fromCharCode(65 + (xInterval / deltaInterval) + 5);
                labels.push(
                    <text
                        key={'l-grid-' + xLabel + yLabel}
                        x={xInterval + 5} y={yInterval + textDeltaY}
                        fontSize={fontSize + 'rem'} textAnchor="start"
                        fill={ColorPalette.MUTE_DARK}
                        className="hanging"
                    >{xLabel}{yLabel}</text>
                );
            }
        }

        return labels;
    }

    private static getFontSize(scale: number): number {
        if (scale < 40) {
            return 4;
        }
        if (scale < 100) {
            return 2;
        }

        return 1;
    }
}

const mapStateToProps = (state: any) => {
    return {
        visible: ClientSelectors.getMapGridVisible(state),
        mapScale: ClientSelectors.getMapScale(state),
        mapCenter: ClientSelectors.getMapCenter(state),
    };
};

export default connect(mapStateToProps)(GridOverlayElement);
