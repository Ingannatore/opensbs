import * as React from 'react';
import {connect} from 'react-redux';
import CompassPropsModel from './compass-props.model';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';
import ColorPalette from '../../color-palette';

class CompassRadialWidget extends React.Component<CompassPropsModel, {}> {
    private readonly translation: string;
    private readonly markersDegrees: number[];

    constructor(props: CompassPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.markersDegrees = Array.from({length: 24}, (value, key) => key * 15);
    }

    public render() {
        const markers = this.markersDegrees.map((degrees: number) => {
            return CompassRadialWidget.renderMarker(degrees);
        });
        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));

        return (
            <g transform={this.translation}>
                <g transform={SvgTransforms.rotate(-yaw)}>
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
        direction: SpaceshipSelectors.getDirection(state),
    };
};

export default connect(mapStateToProps)(CompassRadialWidget);
