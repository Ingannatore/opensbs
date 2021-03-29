import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import ThrottleSliderElement from './throttle-slider.element';

interface ThrottleElementModel {
    x: number,
    y: number,
    throttle: number,
    targetSpeed: number,
    onClick: (throttle: number) => void,
}

export default class ThrottleElement extends React.Component<ThrottleElementModel, {}> {
    private readonly translation: string;

    constructor(props: ThrottleElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        const sliderY = 30 + (530 * ((100 - this.props.throttle) / 200));

        const markers = Array
        .from({length: 17}, (value, key) => (key * 33) + 30)
        .map((y: number, index: number) => ThrottleElement.renderMarker(y, index));

        return (
            <g transform={this.translation} cursor="crosshair" onClick={this.clickHandler}>
                <rect x="0" y="0" width="200" height="590" fill="black"/>
                {markers}

                <text x="100" y="30" textAnchor="middle" fontSize="1.75rem" fill="#121212">AHEAD</text>
                <text x="100" y="200" textAnchor="middle" fontSize="8rem" fill="#121212">^</text>
                <text
                    x="100" y="-390"
                    textAnchor="middle" fontSize="8rem"
                    fill="#121212"
                    transform="scale(1, -1)"
                >^</text>
                <text x="100" y="560" textAnchor="middle" fontSize="1.75rem" fill="#121212">ASTERN</text>

                <ThrottleSliderElement
                    x={0} y={sliderY}
                    color={'darkturquoise'}
                >{this.props.targetSpeed}</ThrottleSliderElement>
            </g>
        );
    }

    private static renderMarker(y: number, index: number) {
        const fill = index % 4 === 0 ? 'darkgrey' : '#121212';
        return (
            <g key={'throttle-marker-' + y} transform={SvgTransforms.translate(0, y)}>
                <rect x="0" y="0" width="30" height="2" fill={fill} stroke="none"/>
                <rect x="170" y="0" width="30" height="2" fill={fill} stroke="none"/>
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
