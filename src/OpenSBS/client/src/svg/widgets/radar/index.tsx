import * as React from 'react';
import {connect} from 'react-redux';
import Vector3 from '../../../models/vector3';
import SvgTransforms from '../../../lib/svg-transforms';
import ShipSelectors from '../../../store/selectors/ship';
import BearingBezel from '../../elements/bearingBezel';
import DirectionsOverlay from '../../elements/directionsOverlay';
import Display from '../../elements/display';
import RangesOverlay from '../../elements/rangesOverlay';
import RoundButton from '../../elements/roundButton';
import Actions from './actions';
import {RadarRanges, RadarState} from './state';

interface RadarProps {
    dispatch: any,
    x: number,
    y: number,
    range: number,
    rotation: Vector3,
    radar: RadarState,
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
        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
        this.toggleWeaponsOverlay = this.toggleWeaponsOverlay.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    render() {
        return (
            <g transform={this.translation}>
                <BearingBezel rotation={this.props.rotation.y}/>
                <RangesOverlay range={this.props.range} visible={this.props.radar.enableRangesOverlay}/>
                <DirectionsOverlay visible={this.props.radar.enableDirectionsOverlay}/>
                <use href="#icon-ship"/>

                <g transform="translate(-420 420)">
                    <RoundButton
                        x={-40} y={-120}
                        onClick={this.toggleDirectionsOverlay}
                        toggled={this.props.radar.enableDirectionsOverlay}
                    >DIR</RoundButton>
                    <RoundButton
                        x={30} y={-30}
                        onClick={this.toggleRangesOverlay}
                        toggled={this.props.radar.enableRangesOverlay}
                    >RNG</RoundButton>
                    <RoundButton
                        x={120} y={40}
                        onClick={this.toggleWeaponsOverlay}
                        toggled={this.props.radar.enableWeaponsOverlay}
                    >WPN</RoundButton>
                </g>

                <g transform="translate(420 420)">
                    <RoundButton
                        x={40} y={-120} fontSize={3}
                        onClick={this.zoomIn}
                    >+</RoundButton>
                    <Display title="radar range" subtitle={this.props.range <= 1000 ? 'meters' : 'kilometers'}>
                        {this.props.range <= 1000 ? this.props.range : this.props.range / 1000}
                    </Display>
                    <RoundButton
                        x={-120} y={40} fontSize={3}
                        onClick={this.zoomOut}
                    >-</RoundButton>
                </g>
            </g>
        );
    }

    private toggleDirectionsOverlay() {
        this.props.dispatch(Actions.toggleDirectionsOverlay());
    }

    private toggleRangesOverlay() {
        this.props.dispatch(Actions.toggleRangesOverlay());
    }

    private toggleWeaponsOverlay() {
        this.props.dispatch(Actions.toggleWeaponsOverlay());
    }

    private zoomIn() {
        this.props.dispatch(Actions.zoomIn());
    }
    private zoomOut() {
        this.props.dispatch(Actions.zoomOut());
    }
}

const mapStateToProps = (state: any) => {
    return {
        radar: state.radar,
        range: RadarRanges[state.radar.zoomLevel],
        rotation: ShipSelectors.selectShipRotation(state),
    };
};

export default connect(mapStateToProps)(Radar);
