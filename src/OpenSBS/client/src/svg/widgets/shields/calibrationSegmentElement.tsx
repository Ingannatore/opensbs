import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ColorPalette from '../../colorPalette';
import BaseComponentProps from "../../../models/baseComponentProps";

interface CalibrationSegmentElementProps extends BaseComponentProps {
    x: number,
    y: number,
    toggled: boolean,
    enabled: boolean,
    onClick: () => void,
}

export default class CalibrationSegmentElement extends React.Component<CalibrationSegmentElementProps, {}> {
    private readonly translation: string;

    constructor(props: CalibrationSegmentElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    public render() {
        return (
            <g
                transform={this.translation}
                cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
                onClick={this.onClickHandler}
            >
                <rect
                    x="0" y="0"
                    width="20" height="40"
                    stroke={this.props.enabled ? ColorPalette.SECONDARY : ColorPalette.MUTE_LIGHT}
                    rx="4" ry="4"
                />
                {
                    this.props.toggled &&
                    <rect
                        x="3" y="3"
                        width="14" height="34"
                        fill={ColorPalette.SECONDARY}
                        rx="3" ry="3"
                    />
                }
                {
                    !this.props.enabled &&
                    <rect
                        x="3" y="3"
                        width="14" height="34"
                        fill={ColorPalette.MUTE}
                        rx="3" ry="3"
                    />
                }
                <text
                    x="24" y="20"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.children}</text>
            </g>
        );
    }

    private onClickHandler() {
        if (this.props.enabled) {
            this.props.onClick();
        }
    }
}
