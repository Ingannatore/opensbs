import * as React from 'react';
import Angles from 'lib/angles';
import Coloring from 'lib/coloring';
import Icons from 'lib/icons';
import SvgTransforms from 'lib/svgTransforms';
import EntityTrace from 'models/entityTrace';
import ColorPalette from 'svg/colorPalette';

interface TargetRowElementProps {
    x: number,
    y: number,
    trace: EntityTrace,
    selected: boolean,
    onClick: (trace: EntityTrace) => void,
}

export default class TargetRowElement extends React.Component<TargetRowElementProps, {}> {
    public render() {
        const color = Coloring.getReputationColor(this.props.trace.reputation);

        return (
            <g
                transform={SvgTransforms.translate(this.props.x, this.props.y)}
                cursor="pointer"
                onClick={() => this.props.onClick(this.props.trace)}
            >
                <rect
                    x="1" y="1"
                    width="447" height="28"
                    stroke="none"
                    fill={this.props.selected ? ColorPalette.MUTE_DARK : ColorPalette.BACKGROUND}
                />
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE} strokeWidth="1"
                />
                <g transform="translate(20 15)">
                    <use
                        x="-16" y="-16"
                        href={Icons.forEntity(this.props.trace.type)}
                        stroke={color} fill={color}
                        transform="scale(.5)"
                    />
                </g>
                <text
                    x="50" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.callSign}</text>
                <text
                    x="190" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{Angles.bearingToString(this.props.trace.spatial.relativeBearing)}</text>
                <text
                    x="320" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.spatial.distance}</text>
                <text
                    x="430" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.spatial.speed}</text>
            </g>
        );
    }
}
