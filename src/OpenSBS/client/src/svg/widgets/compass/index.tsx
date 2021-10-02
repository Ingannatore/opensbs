import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ColorPalette from '../../colorPalette';

interface CompassWidgetProps {
    x: number,
    y: number,
    bearing: number,
}

class CompassWidget extends React.Component<CompassWidgetProps, {}> {
    private readonly translation: string;
    private readonly markersDegrees: number[];

    constructor(props: CompassWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.markersDegrees = Array.from({length: 24}, (value, key) => key * 15);
    }

    public render() {
        const markers = this.markersDegrees.map((degrees: number) => {
            return CompassWidget.renderMarker(degrees);
        });

        return (
            <g transform={this.translation}>
                <g transform={SvgTransforms.rotate(-this.props.bearing)}>
                    {markers}
                </g>
            </g>
        );
    }

    private static renderMarker(degrees: number) {
        if (degrees % 45 === 0) {
            return (
                <g key={'compass-radial-marker-' + degrees} transform={SvgTransforms.rotate(degrees)}>
                    <text
                        x="0" y="-474"
                        textAnchor="middle"
                        fontSize="1.5rem"
                        fill={ColorPalette.FILLER}
                    >{degrees}</text>
                </g>
            );
        }

        return (
            <g key={'compass-radial-marker-' + degrees} transform={SvgTransforms.rotate(degrees)}>
                <line
                    x1="0" y1="-468"
                    x2="0" y2="-482"
                    stroke={ColorPalette.TEXT} strokeWidth="2"
                />
            </g>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        bearing: SpaceshipSelectors.getBearing(state),
    };
};

export default connect(mapStateToProps)(CompassWidget);
