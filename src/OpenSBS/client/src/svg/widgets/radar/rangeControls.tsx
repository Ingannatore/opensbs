import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import GroupLabel from '../../elements/groupLabel';
import SwitchElement from '../../elements/switchElement';
import ColorPalette from '../../colorPalette';

interface RangeControlsProps {
    x: number,
    y: number,
    range: number,
    maximumRange: number,
    onChange: (value: number) => void,
}

export default class RangeControls extends React.Component<RangeControlsProps, {}> {
    private readonly translation: string;

    constructor(props: RangeControlsProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <line
                    x1="20" y1="20"
                    x2="200" y2="20"
                    stroke={ColorPalette.SECONDARY} strokeWidth="2"
                />
                {this.renderButton(0, 0, "5K", 5000)}
                {this.renderButton(80, 0, "10K", 10000)}
                {this.renderButton(160, 0, "MAX", this.props.maximumRange)}
                <GroupLabel x={110} y={68} size={160} mirrored={true}>RANGE</GroupLabel>
            </g>
        );
    }

    private renderButton(x: number, y: number, label: string, value: number) {
        return (
            <SwitchElement
                x={x} y={y}
                width={60} height={40}
                fontSize={1.5} color={ColorPalette.SECONDARY}
                onClick={() => this.props.onChange(value)}
                toggled={this.props.range === value}
            >{label}</SwitchElement>
        );
    }
}
