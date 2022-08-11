import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';
import BaseComponentProps from "../../models/baseComponentProps";

interface PanelHeaderProps extends BaseComponentProps {
    x: number,
    y: number,
    subtext: string | null,
    icon: string | null,
    textFill: string,
    subtextFill: string,
    iconStroke: string,
    iconFill: string,
}

export default class PanelHeader extends React.Component<PanelHeaderProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        subtext: null,
        icon: null,
        textFill: ColorPalette.TEXT,
        subtextFill: ColorPalette.MUTE_LIGHT,
        iconStroke: ColorPalette.TEXT,
        iconFill: ColorPalette.TEXT,
    };

    constructor(props: PanelHeaderProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="10" y="20"
                    textAnchor="start" fontSize="1.5rem"
                    fill={this.props.textFill}
                >{this.props.children}</text>
                {
                    this.props.subtext &&
                    <text
                        x="400" y="20"
                        fontSize="1.25rem" textAnchor="end"
                        fill={this.props.subtextFill}
                    >{this.props.subtext}</text>
                }
                {
                    this.props.icon &&
                    <g transform="translate(420 20)">
                        <use
                            x="-16" y="-16"
                            href={this.props.icon}
                            stroke={this.props.iconStroke} fill={this.props.iconFill}
                            transform="scale(.75)"
                        />
                    </g>
                }
                <line x1="0" y1="40" x2="450" y2="40" stroke={ColorPalette.MUTE} strokeWidth="2"/>
            </g>
        );
    }
}
