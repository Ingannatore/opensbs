import * as React from 'react';
import {connect} from 'react-redux';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ShipElement from '../../elements/shipElement';

interface ShipOverlayProps {
    x: number,
    y: number,
    bearing: number,
}

class ShipOverlay extends React.Component<ShipOverlayProps, {}> {
    public render() {
        return (
            <ShipElement
                x={this.props.x} y={this.props.y}
                bearing={this.props.bearing}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        bearing: SpaceshipSelectors.getBearing(state),
    };
};

export default connect(mapStateToProps)(ShipOverlay);
