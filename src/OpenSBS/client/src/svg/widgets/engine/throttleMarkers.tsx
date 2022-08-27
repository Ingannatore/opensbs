import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import ColorPalette from 'svg/colorPalette';

export default class ThrottleMarkers extends React.Component<{}, {}> {
    private readonly markers: number[];

    constructor(props: any) {
        super(props);

        this.markers = Array.from({length: 17}, (value, key) => (key * 33) + 30);
    }

    public render() {
        const markers = this.markers.map(
            (y: number, index: number) => ThrottleMarkers.renderMarker(y, index)
        );

        return (
            <g transform={SvgTransforms.translate(0, 10)}>
                {markers}

                <text
                    x="100" y="30"
                    textAnchor="middle" fontSize="1.75rem"
                    fill={ColorPalette.MUTE}
                >AHEAD</text>
                <text
                    x="100" y="200"
                    textAnchor="middle" fontSize="8rem"
                    fill={ColorPalette.MUTE}
                >^</text>
                <text
                    x="100" y="-390"
                    textAnchor="middle" fontSize="8rem"
                    fill={ColorPalette.MUTE}
                    transform="scale(1, -1)"
                >^</text>
                <text
                    x="100" y="560"
                    textAnchor="middle" fontSize="1.75rem"
                    fill={ColorPalette.MUTE}
                >ASTERN</text>
            </g>
        );
    }

    private static renderMarker(y: number, index: number) {
        const isMayor = index % 4 === 0;
        const fill = isMayor ? ColorPalette.TEXT : ColorPalette.MUTE;
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
}
