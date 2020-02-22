import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import DoubleDisplay from '../elements/doubleDisplay';
import RoundButton from '../elements/roundButton';
import ArcSlider from '../elements/arcSlider';

interface WarpDriveProps {
    x: number,
    y: number,
}

export default class WarpDrive extends React.Component<WarpDriveProps> {
    private readonly translation: string;

    constructor(props: WarpDriveProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.decreaseWarpHandler = this.decreaseWarpHandler.bind(this);
        this.linkWaypointHandler = this.linkWaypointHandler.bind(this);
        this.activateWarpHandler = this.activateWarpHandler.bind(this);
        this.increaseWarpHandler = this.increaseWarpHandler.bind(this);
    }

    render() {
        return (
            <g transform={this.translation}>
                <ArcSlider
                    size={2} labels={'6 5 4 3 2 1 off'}
                    minValue={0} maxValue={6} value={0}
                />
                <DoubleDisplay
                    topTitle={'warp factor'} topValue={'off'}
                    bottomTitle={'waypoint'} bottomValue={'-'}
                />
                <RoundButton x={-140} y={80} onClick={this.decreaseWarpHandler}>-1</RoundButton>
                <RoundButton x={-60} y={150} onClick={this.linkWaypointHandler}>LNK</RoundButton>
                <RoundButton x={60} y={150} onClick={this.activateWarpHandler}>ACTV</RoundButton>
                <RoundButton x={140} y={80} onClick={this.increaseWarpHandler}>+1</RoundButton>
            </g>
        );
    }

    private decreaseWarpHandler() {
        return;
    }

    private linkWaypointHandler() {
        return;
    }

    private activateWarpHandler() {
        return;
    }

    private increaseWarpHandler() {
        return;
    }
}
