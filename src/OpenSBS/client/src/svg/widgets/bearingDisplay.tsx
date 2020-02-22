import * as React from 'react';
import {connect} from 'react-redux';
import ShipSelectors from '../../store/selectors/ship';
import Display from '../elements/display';

interface BearingDisplayProps {
    x: number,
    y: number,
    bearing: number,
}

class BearingDisplay extends React.Component<BearingDisplayProps> {
    public static defaultProps = {
        x: 0,
        y: 0,
    };

    public render() {
        return (
            <Display x={this.props.x} y={this.props.y} title="bearing" subtitle="degrees">
                {this.formatBearing()}
            </Display>
        );
    }

    private formatBearing() {
        return ('000' + Math.trunc(this.props.bearing)).slice(-3);
    }
}

const mapStateToProps = (state: any) => {
    return {
        bearing: ShipSelectors.selectShipRotation(state).y
    };
};

export default connect(mapStateToProps)(BearingDisplay);
