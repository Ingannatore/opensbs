import * as React from 'react';
import EntityTraceModel from '../../../modules/entity-trace.model';
import SvgTransforms from '../../../lib/svg-transforms';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';
import ColorPalette from '../../color-palette';
import SwitchElement from '../../elements/switch.element';

interface TargetPropsModel {
    x: number,
    y: number,
    trace: EntityTraceModel,
    isSelected: boolean,
    onClick: () => void,
}

export default class TargetElement extends React.Component<TargetPropsModel, {}> {
    private readonly translation: string;

    constructor(props: TargetPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const yaw = Angles.normalizeYaw(Vectors.getYaw(this.props.trace.relativeDirection));
        const icon = `/images/icons.svg#icon-${this.props.trace.type}`

        return (
            <g transform={this.translation}>
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <SwitchElement
                    x={10} y={10}
                    width={20} height={20}
                    onClick={this.props.onClick}
                    toggled={this.props.isSelected}
                />
                <text
                    x="50" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.callSign}</text>
                <use href={icon} x="230" y="5" fill="none" stroke={ColorPalette.TEXT}/>
                <text
                    x="370" y="20"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{this.props.trace.distance}</text>
                <text
                    x="430" y="20"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{yaw.toString().padStart(3, '0')}</text>
            </g>
        );
    }
}
