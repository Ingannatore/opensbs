import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';

interface ThrottleElementModel {
    x: number,
    y: number,
    throttle: number,
    targetSpeed: number,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>, throttle: number) => void,
}

export default class ThrottleElement extends React.Component<ThrottleElementModel, {}> {
    private readonly translation: string;

    constructor(props: ThrottleElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        const markers = Array
        .from({length: 21}, (value, key) => (key * 26.4) + 30)
        .map((y: number, index: number) => ThrottleElement.renderMarker(y, index));

        return (
            <g transform={this.translation} cursor="crosshair" onClick={this.clickHandler}>
                <rect x="0" y="0" width="200" height="590" fill="black"/>
                {markers}

                <text x="100" y="30" textAnchor="middle" fontSize="1.75rem" fill="darkgrey">AHEAD</text>
                <text x="100" y="200" textAnchor="middle" fontSize="8rem" fill="#121212">^</text>
                <text
                    x="100" y="-390"
                    textAnchor="middle" fontSize="8rem"
                    fill="#121212"
                    transform="scale(1, -1)"
                >^</text>
                <text x="100" y="560" textAnchor="middle" fontSize="1.75rem" fill="darkgrey">ASTERN</text>

                {ThrottleElement.renderSlider(this.props.throttle, this.props.targetSpeed)}
            </g>
        );
    }

    private static renderMarker(y: number, index: number) {
        const fill = index % 5 === 0 ? 'darkgrey' : '#121212';
        return (
            <g key={'throttle-marker-' + y} transform={SvgTransforms.translate(0, y)}>
                <rect x="0" y="0" width="30" height="2" fill={fill} stroke="none"/>
                <rect x="170" y="0" width="30" height="2" fill={fill} stroke="none"/>
            </g>
        );
    }

    private static renderSlider(throttle: number, targetSpeed: number) {
        const factor = (100 - throttle) / 200;
        const sliderY = 30 + (530 * factor);

        return (
            <g transform={SvgTransforms.translate(0, sliderY)}>
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="none" fill="black"
                />
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="none" fill="burlywood"
                    opacity={0.05}
                />
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="burlywood" strokeWidth="2"
                    fill="none"
                />
                <text
                    x="100" y="0"
                    textAnchor="middle" fontSize="3rem"
                    fill="burlywood"
                >{targetSpeed}</text>
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGElement, MouseEvent>) {
        const relativeY = 390 + 305 - event.clientY;
        const absRelativeY = Math.abs(relativeY);

        let throttle = 0;
        if (absRelativeY > 5) {
            throttle = Math.round((absRelativeY - 5) / 3) * Math.sign(relativeY);
        }

        this.props.onClick(event, throttle);
    }
}
