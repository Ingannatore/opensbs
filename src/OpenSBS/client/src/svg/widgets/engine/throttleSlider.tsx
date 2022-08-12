import * as React from "react";
import SvgTransforms from "../../../lib/svgTransforms";
import ColorPalette from "../../colorPalette";

interface ThrottleSliderProps {
    x: number,
    y: number,
    throttle: number,
}

export default class ThrottleSlider extends React.Component<ThrottleSliderProps, {}> {
    private readonly translation: string;

    constructor(props: ThrottleSliderProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const sliderY = 265 * (-this.props.throttle / 100);

        return (
            <g transform={this.translation}>
                <g transform={SvgTransforms.translate(0, sliderY)}>
                    <rect
                        x="-60" y="-30"
                        width="120" height="60" rx="5"
                        stroke="none" fill={ColorPalette.BACKGROUND}
                    />
                    <rect
                        x="-60" y="-30"
                        width="120" height="60" rx="5"
                        stroke="none" fill={ColorPalette.MAIN}
                        opacity={0.05}
                    />
                    <rect
                        x="-60" y="-30"
                        width="120" height="60" rx="5"
                        stroke={ColorPalette.MAIN} strokeWidth="2"
                        fill="none"
                    />
                    <text
                        x="0" y="-8"
                        textAnchor="middle" fontSize="2rem"
                        fill={ColorPalette.TEXT}
                    >{this.props.throttle}%
                    </text>
                    <text
                        x="0" y="16"
                        textAnchor="middle" fontSize="0.75rem"
                        fill={ColorPalette.TEXT}
                    >throttle
                    </text>
                </g>
            </g>
        );
    }
}
