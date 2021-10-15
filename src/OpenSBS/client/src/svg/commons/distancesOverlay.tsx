import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../lib/svgTransforms';
import SpaceshipSelectors from '../../store/spaceship/spaceshipSelectors';
import SensorsModule from '../../modules/sensors/sensorsModule';
import ColorPalette from '../colorPalette';

interface DistancesOverlayProps {
    x: number,
    y: number,
    r: number,
    scale: number,
    range: number | undefined,
    numberOfMarkers: number,
    sensors: SensorsModule | undefined,
}

class DistancesOverlay extends React.Component<DistancesOverlayProps, {}> {
    private readonly radiusIncrement: number;
    private readonly translation: string;

    public static defaultProps = {
        range: undefined,
        numberOfMarkers: 5,
    };

    constructor(props: DistancesOverlayProps) {
        super(props);

        this.radiusIncrement = this.props.r / this.props.numberOfMarkers;
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const maxRange = this.props.range ? this.props.range : this.props.sensors.range;
        const rangeIncrement = this.props.scale * maxRange / this.props.numberOfMarkers;
        const markers = Array.from(
            {length: this.props.numberOfMarkers},
            (value, key) => this.renderMarker(key + 1, rangeIncrement)
        );

        return (
            <g transform={this.translation}>
                {markers}
            </g>
        );
    }

    private renderMarker(index: number, rangeIncrement: number) {
        const radius = this.radiusIncrement * index;
        const range = rangeIncrement * index;
        const value = range < 10000 ? `${range}` : `${range / 1000}Km`;
        return (
            <g key={'distance-marker-' + radius}>
                <circle
                    cx="0" cy="0" r={radius}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />
                <text
                    x="0" y={16 - radius}
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.MUTE_LIGHT}
                >{value}</text>
            </g>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(DistancesOverlay);
