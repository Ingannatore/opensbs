import Angles from 'lib/angles';
import SvgTransforms from 'lib/svgTransforms';
import EntityTrace from 'models/entityTrace';
import * as React from 'react';
import ColorPalette from 'svg/colorPalette';

interface UnscannedTraceProps {
    x: number,
    y: number,
    trace: EntityTrace,
    selected: boolean,
    onClick: (trace: EntityTrace) => void,
}

export default class UnscannedTrace extends React.Component<UnscannedTraceProps, {}> {
    public render() {
        const translation = SvgTransforms.translate(this.props.x, this.props.y)
        return (
            <g transform={translation} key={`analyzer-trace-${this.props.trace.id}`}>
                <rect
                    x="1" y="1" width="278" height="58"
                    stroke="none" fill={this.props.selected ? ColorPalette.MUTE_DARK : ColorPalette.BACKGROUND}
                />
                <text
                    x="10" y="20"
                    fontSize="1.25rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.callSign}</text>
                <text
                    x="270" y="20" fontSize="1.25rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{Angles.bearingToString(this.props.trace.spatial.relativeBearing)}</text>

                <text
                    x="10" y="45"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.TEXT_DARK}
                >{this.props.trace.spatial.distance} m</text>
                <text
                    x="270" y="45"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.TEXT_DARK}
                >{this.props.trace.spatial.speed} m/s</text>

                <line x1="0" y1="60" x2="280" y2="60" stroke={ColorPalette.MUTE} strokeWidth="1"/>
                <rect
                    x="0" y="0" width="280" height="60"
                    fill="black" stroke="none" opacity="0" cursor="pointer"
                    onClick={() => this.props.onClick(this.props.trace)}
                />
            </g>
        );
    }
}
