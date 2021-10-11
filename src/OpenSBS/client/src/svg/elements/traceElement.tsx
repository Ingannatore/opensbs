import * as React from 'react';
import Coords from '../../lib/coords';
import Icons from '../../lib/icons';
import SvgTransforms from '../../lib/svgTransforms';
import EntityTrace from '../../models/entityTrace';
import Vector3 from '../../models/vector3';
import ColorPalette from '../colorPalette';

interface TraceElementProps {
    trace: EntityTrace,
    scale: number,
    center: Vector3,
    selected: boolean,
    onClick: (trace: EntityTrace) => void,
}

export default class TraceElement extends React.Component<TraceElementProps, {}> {
    public static defaultProps = {
        center: {x: 0, y: 0, z: 0},
        selected: false,
    };

    public render() {
        const position = Coords.translateAndScale(
            this.props.trace.position,
            this.props.center,
            this.props.scale
        );
        const translation = SvgTransforms.translate(position.x, -position.z);
        const rotation = SvgTransforms.rotate(this.props.trace.bearing);
        const isHighScale = this.props.scale > 80;

        return (
            <g
                key={`trace-${this.props.trace.id}`}
                transform={translation} cursor="pointer"
                onClick={() => this.props.onClick(this.props.trace)}
            >
                <use
                    x="-16" y="-16"
                    href={Icons.getEntityIcon(this.props.trace.type)}
                    stroke={ColorPalette.TEXT} fill={ColorPalette.TEXT}
                    transform={'scale(.5) ' + rotation}
                />
                {
                    (!isHighScale || this.props.selected) &&
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="middle"
                        fill={ColorPalette.TEXT}
                    >{this.props.trace.callSign}</text>
                }
                {
                    this.props.selected &&
                    <use
                        href="/images/icons.svg#brackets"
                        x="-50" y="-18"
                        stroke={ColorPalette.DANGER}
                    />
                }
            </g>
        );
    }
}
