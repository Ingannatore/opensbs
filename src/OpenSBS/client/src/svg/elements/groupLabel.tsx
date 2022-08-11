import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';
import BaseComponentProps from "../../models/baseComponentProps";

interface GroupLabelProps extends BaseComponentProps {
    x: number,
    y: number,
    size: number,
    mirrored: boolean,
}

export default class GroupLabel extends React.Component<GroupLabelProps, {}> {
    private readonly translation: string;
    private readonly path: string;

    public static defaultProps = {
        mirrored: false,
    };

    constructor(props: GroupLabelProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);

        const halfSize = this.props.size / 2;
        const deltaY = this.props.mirrored ? -8 : 8;
        this.path = `M -${halfSize} ${deltaY} L -${halfSize} 0 L ${halfSize} 0 L ${halfSize} ${deltaY}`;
    }

    public render() {
        if (this.props.mirrored) {
            return (
                <g transform={this.translation}>
                    <g transform="translate(0 -15)">
                        <path
                            d={this.path}
                            stroke={ColorPalette.MUTE} strokeWidth="2"
                            fill="none"
                        />
                    </g>
                    <text
                        x="0" y="0"
                        fontSize="1rem" textAnchor="middle"
                        fill={ColorPalette.HEADER}
                    >{this.props.children}</text>
                </g>
            );
        }

        return (
            <g transform={this.translation}>
                <text
                    x="0" y="0"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.children}</text>
                <g transform="translate(0 15)">
                    <path
                        d={this.path}
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill="none"
                    />
                </g>
            </g>
        );
    }
}
