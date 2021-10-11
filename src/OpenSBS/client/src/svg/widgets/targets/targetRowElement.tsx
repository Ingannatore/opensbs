import EntityTrace from '../../../models/entityTrace';
import * as React from 'react';
import ColorPalette from '../../colorPalette';
import SwitchElement from '../../elements/switchElement';
import Icons from '../../../lib/icons';
import Angles from '../../../lib/angles';
import SvgTransforms from '../../../lib/svgTransforms';

interface TargetRowElementProps {
    x: number,
    y: number,
    trace: EntityTrace,
    selected: boolean,
    onClick: (trace: EntityTrace) => void,
}

export default class TargetRowElement extends React.Component<TargetRowElementProps, {}> {
    public render() {
        return (
            <g transform={SvgTransforms.translate(this.props.x, this.props.y)}>
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <SwitchElement
                    x={10} y={10}
                    width={20} height={20}
                    onClick={() => this.props.onClick(this.props.trace)}
                    toggled={this.props.selected}
                />
                <text
                    x="50" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.callSign}</text>
                <g transform="translate(244 20)">
                    <use
                        x="-16" y="-16"
                        href={Icons.getEntityIcon(this.props.trace.type)}
                        stroke={ColorPalette.TEXT} fill={ColorPalette.TEXT}
                        transform="scale(.75)"
                    />
                </g>
                <text
                    x="370" y="20"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.distance}</text>
                <text
                    x="430" y="20"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{Angles.bearingToString(this.props.trace.relativeBearing)}</text>
            </g>
        );
    }
}
