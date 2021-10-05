import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ThrottleSliderElement from './throttleSliderElement';
import ColorPalette from '../../colorPalette';

interface ThrottleElementProps {
    x: number,
    y: number,
    throttle: number,
    targetSpeed: number,
    onClick: (throttle: number) => void,
}

export default class ThrottleElement extends React.Component<ThrottleElementProps, {}> {
    private readonly translation: string;
    private readonly markers: number[];

    constructor(props: ThrottleElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.markers = Array.from({length: 17}, (value, key) => (key * 33) + 30);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        const sliderY = 30 + (530 * ((100 - this.props.throttle) / 200));

        const markers = this.markers.map(
            (y: number, index: number) => ThrottleElement.renderMarker(y, index)
        );

        return (
            <g transform={this.translation} cursor="crosshair" onClick={this.clickHandler}>
                <rect
                    x="0" y="0"
                    width="200" height="590"
                    fill={ColorPalette.BACKGROUND}
                />
                {markers}

                <text
                    x="100" y="30"
                    textAnchor="middle" fontSize="1.75rem"
                    fill={ColorPalette.MUTE_DARK}
                >AHEAD</text>
                <text
                    x="100" y="200"
                    textAnchor="middle" fontSize="8rem"
                    fill={ColorPalette.MUTE_DARK}
                >^</text>
                <text
                    x="100" y="-390"
                    textAnchor="middle" fontSize="8rem"
                    fill={ColorPalette.MUTE_DARK}
                    transform="scale(1, -1)"
                >^</text>
                <text
                    x="100" y="560"
                    textAnchor="middle" fontSize="1.75rem"
                    fill={ColorPalette.MUTE_DARK}
                >ASTERN</text>

                <ThrottleSliderElement
                    x={0} y={sliderY}
                >{this.props.throttle}</ThrottleSliderElement>
            </g>
        );
    }

    private static renderMarker(y: number, index: number) {
        const isMayor = index % 4 === 0;
        const fill = isMayor ? ColorPalette.TEXT : ColorPalette.MUTE_DARK;
        return (
            <g key={'throttle-marker-' + y} transform={SvgTransforms.translate(0, y)}>
                <rect
                    x="0" y="0"
                    width={isMayor ? 30 : 15} height="2"
                    fill={fill} stroke="none"
                />
                <rect
                    x={isMayor ? 170 : 185} y="0"
                    width={isMayor ? 30 : 15} height="2"
                    fill={fill} stroke="none"
                />
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGElement, MouseEvent>) {
        const relativeY = 695 - event.clientY;
        const throttle = Math.round(relativeY / 2.65);
        const normalizedThrottle = Math.max(Math.min(throttle, 100), -100);

        this.props.onClick(normalizedThrottle);
    }
}
