import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import Vector3 from '../../../models/vector3';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';

interface CompassRadialWidgetModel {
    x: number,
    y: number,
    direction: Vector3,
}

class CompassRadialWidget extends React.Component<CompassRadialWidgetModel, {}> {
    private readonly translation: string;
    private readonly markersDegrees: number[];

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: any) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.markersDegrees = Array.from({length: 24}, (value, key) => key * 15);
    }

    render() {
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
                        x="0" y="-484"
                        textAnchor="middle"
                        fontSize="1.5rem"
                        fill="whitesmoke"
                    >{degrees}</text>
                </g>
            );
        }

        return (
            <g key={'compass-radial-marker-' + degrees} transform={SvgTransforms.rotate(degrees)}>
                <line
                    x1="0" y1="-478"
                    x2="0" y2="-492"
                    stroke="grey" strokeWidth="2"
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
