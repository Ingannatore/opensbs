import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../lib/svg-transforms';
import Waypoint from '../../models/waypoint';
import SpaceshipSelectors from '../../store/spaceship/spaceship.selectors';
import PillButton from '../elements/pillButton';
import WaypointDisplay from '../elements/waypointDisplay';
import RoundButton from '../elements/roundButton';

interface WaypointsListProps {
    x: number,
    y: number,
    shipId: string,
    module: any,
}

class WaypointsList extends React.Component<WaypointsListProps, {}> {
    private readonly translation: string;

    constructor(props: WaypointsListProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.autopilotClickHandler = this.autopilotClickHandler.bind(this);
        this.alignClickHandler = this.alignClickHandler.bind(this);
        this.selectWaypointHandler = this.selectWaypointHandler.bind(this);
    }

    public render() {
        const renderedWaypoints = this.getWaypoints()
        .concat(new Array(9).fill(null))
        .slice(0, 9)
        .map((waypoint: Waypoint | null, index: number) => this.renderWaypoint(waypoint, index));

        return (
            <g transform={this.translation}>
                <PillButton
                    x={90} y={30} width={120}
                    fontSize={'1.25rem'}
                    toggled={false}
                    onClick={this.autopilotClickHandler}
                >autopilot</PillButton>
                <PillButton
                    x={290} y={30} width={120}
                    fontSize={'1.25rem'}
                    toggled={false}
                    onClick={this.alignClickHandler}
                >align</PillButton>
                <g transform="translate(30 110)">
                    {renderedWaypoints}
                </g>
            </g>
        );
    }

    private renderWaypoint(waypoint: Waypoint | null, index: number) {
        return (
            <g transform={SvgTransforms.translate(0, index * 70)} key={'waypoint-' + index}>
                <RoundButton
                    fontSize={2}
                    onClick={this.selectWaypointHandler}
                >{index}</RoundButton>
                <WaypointDisplay
                    x={70} y={0}
                    waypoint={waypoint}
                />
            </g>
        );
    }

    private autopilotClickHandler() {

    }

    private alignClickHandler() {

    }

    private selectWaypointHandler() {

    }

    private getWaypoints(): Waypoint[] {
        return this.props.module ? this.props.module.waypoints : [];
    }
}

const mapStateToProps = (state: any) => {
    return {
        shipId: SpaceshipSelectors.getId(state),
        module: SpaceshipSelectors.getModuleByType(state, 'module.navigation')
    };
};

export default connect(mapStateToProps)(WaypointsList);
