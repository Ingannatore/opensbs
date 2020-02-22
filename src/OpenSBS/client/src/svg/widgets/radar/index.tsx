import * as React from 'react';
import {connect} from 'react-redux';
import Vector3 from '../../../models/vector3';
import SvgTransforms from '../../../lib/svg-transforms';
import ShipSelectors from '../../../store/selectors/ship';
import BearingBezel from '../../elements/bearingBezel';
import DirectionsOverlay from '../../elements/directionsOverlay';
import RangesOverlay from '../../elements/rangesOverlay';

interface RadarProps {
    x: number,
    y: number,
    rotation: Vector3,
}

class Radar extends React.Component<RadarProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: RadarProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    render() {
        return (
            <g transform={this.translation}>
                <BearingBezel rotation={this.props.rotation.y}/>
                <RangesOverlay/>
                <DirectionsOverlay/>
                <use href="#icon-ship"/>
            </g>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        rotation: ShipSelectors.selectShipRotation(state),
    };
};

export default connect(mapStateToProps)(Radar);
