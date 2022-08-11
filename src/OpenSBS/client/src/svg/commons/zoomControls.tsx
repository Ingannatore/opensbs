import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import SwitchElement from '../elements/switchElement';
import ColorPalette from '../colorPalette';
import GroupLabel from '../elements/groupLabel';

interface ZoomControlsProps {
    x: number,
    y: number,
    zoom: number,
    onChangeZoom: (value: number) => void,
}

export default class ZoomControls extends React.Component<ZoomControlsProps, {}> {
    private readonly translation: string;

    constructor(props: ZoomControlsProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <GroupLabel x={110} y={-28} size={180}>ZOOM LEVEL</GroupLabel>
                <line
                    x1="20" y1="20"
                    x2="200" y2="20"
                    stroke={ColorPalette.SECONDARY} strokeWidth="2"
                />
                {this.renderZoomButton(0, 0, "1", 1)}
                {this.renderZoomButton(60, 0, "2", 0.75)}
                {this.renderZoomButton(120, 0, "3", 0.5)}
                {this.renderZoomButton(180, 0, "4", 0.25)}
            </g>
        );
    }

    private renderZoomButton(x: number, y: number, label: string, value: number) {
        return (
            <SwitchElement
                x={x} y={y} rx={8}
                width={40} height={40}
                fontSize={1.5} color={ColorPalette.SECONDARY}
                onClick={() => this.props.onChangeZoom(value)}
                toggled={this.props.zoom === value}
            >{label}</SwitchElement>
        );
    }
}
