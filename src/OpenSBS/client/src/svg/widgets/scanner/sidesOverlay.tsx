import * as React from 'react';
import {connect} from 'react-redux';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import SidesElement from '../../elements/sidesElement';

interface SidesOverlayProps {
    x: number,
    y: number,
    r: number,
    bearing: number,
}

class SidesOverlay extends React.Component<SidesOverlayProps, {}> {
    public render() {
        return (
            <SidesElement
                x={this.props.x}
                y={this.props.y}
                r={this.props.r}
                rotation={this.props.bearing}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        bearing: SpaceshipSelectors.getBearing(state),
    };
};

export default connect(mapStateToProps)(SidesOverlay);
