﻿import * as React from 'react';
import {connect} from 'react-redux';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import CompassElement from '../../elements/compassElement';

interface CompassWidgetProps {
    x: number,
    y: number,
    bearing: number,
}

class CompassWidget extends React.Component<CompassWidgetProps, {}> {
    public render() {
        return (
            <CompassElement
                x={this.props.x}
                y={this.props.y}
                r={460}
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

export default connect(mapStateToProps)(CompassWidget);
