import * as React from 'react';
import Icons from '../../lib/icons';
import SvgTransforms from '../../lib/svgTransforms';
import EntityTrace from '../../models/entityTrace';
import ColorPalette from '../colorPalette';

interface TraceElementProps {
    x: number,
    y: number,
    trace: EntityTrace,
    rotation: number,
    selected: boolean,
    onClick: (trace: EntityTrace) => void,
}

export default class TraceElement extends React.Component<TraceElementProps, {}> {
    public static defaultProps = {
        rotation: 0,
        selected: false,
    };

    public render() {
        const translation = SvgTransforms.translate(this.props.x, this.props.y);
        const bearingRotation = SvgTransforms.rotate(this.props.trace.spatial.bearing);
        const textRotation = SvgTransforms.rotate(this.props.rotation);

        return (
            <g
                transform={translation} cursor="pointer"
                onClick={() => this.props.onClick(this.props.trace)}
            >
                <g transform={textRotation}>
                    <use
                        x="-16" y="-16"
                        href={Icons.forEntity(this.props.trace.type)}
                        stroke={ColorPalette.TEXT} fill={ColorPalette.TEXT}
                        transform={'scale(.5) ' + bearingRotation}
                    />
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="middle"
                        fill={ColorPalette.TEXT}
                    >{this.props.trace.callSign}</text>
                    {
                        this.props.selected &&
                        <use
                            href="/images/icons.svg#brackets"
                            x="-50" y="-18"
                            stroke={ColorPalette.DANGER}
                        />
                    }
                </g>
            </g>
        );
    }
}
