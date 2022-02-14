import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface GroupLabelProps {
    x: number,
    y: number,
    size: number,
}

export default class GroupLabel extends React.Component<GroupLabelProps, {}> {
    private readonly translation: string;

    constructor(props: GroupLabelProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const halfSize = this.props.size / 2;
        const path = `M -${halfSize} 8 L -${halfSize} 0 L ${halfSize} 0 L ${halfSize} 8`;
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="0"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.children}</text>
                <g transform="translate(0 15)">
                    <path
                        d={path}
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill="none"
                    />
                </g>
            </g>
        );
    }
}
