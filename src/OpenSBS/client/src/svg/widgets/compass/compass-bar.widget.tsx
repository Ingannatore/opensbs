import * as React from 'react';
import {connect} from 'react-redux';
import CompassPropsModel from './compass-props.model';
import SvgTransforms from '../../../lib/svgTransforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';

class CompassBarWidget extends React.Component<CompassPropsModel, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: CompassPropsModel) {
        super(props);
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const step = 21;
        const majorStep = step * 5;
        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const dYaw = yaw % 15;
        const centerDegrees = yaw - dYaw;
        const translation = dYaw > 0 ? SvgTransforms.translate(-dYaw * 7, 0) : '';

        const coords = Array.from({length: 53}, (value, key) => (key - 26) * step);
        const markers = coords.map((x: number) => {
            let value = x % majorStep === 0 ? ((x / majorStep) * 15) + centerDegrees : null;
            if (value != null) {
                if (value < 0) {
                    value += 360;
                }
                if (value > 359) {
                    value -= 360;
                }
            }

            return CompassBarWidget.renderMarker(x, value);
        });

        return (
            <g transform={this.translation}>
                <mask id="compass-mask">
                    <rect
                        x="-468" y="2" rx="20"
                        width="936" height="36"
                        stroke="none" fill="white"
                    />
                </mask>
                <rect
                    x="-470" y="0" rx="20"
                    width="940" height="40"
                    stroke="#383838" strokeWidth="2" fill="black"
                />
                <g mask="url(#compass-mask)">
                    <g transform={translation}>
                        {markers}
                    </g>
                </g>
            </g>
        );
    }

    private static renderMarker(x: number, value: number | null) {
        const color = value != null ? 'grey' : 'white';
        return (
            <g key={'compass-marker-' + x} transform={SvgTransforms.translate(x, 0)}>
                <line
                    x1="0" y1="4" x2="0" y2={value != null ? 10 : 8}
                    stroke={color} strokeWidth={value != null ? 2 : 1}
                />
                {value != null && <text x="0" y="20" textAnchor="middle" fontSize="1rem" fill="whitesmoke">{value}</text>}
                <line
                    x1="0" y1={value != null ? 30 : 32} x2="0" y2="36"
                    stroke={color} strokeWidth={value != null ? 2 : 1}
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

export default connect(mapStateToProps)(CompassBarWidget);
