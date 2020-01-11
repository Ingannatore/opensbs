import * as React from 'react';
import {connect} from 'react-redux';
import ShipSelectors from '../../store/selectors/ship';
import Vector3 from '../../models/vector3';
import Display from '../../elements/display';

interface BearingComponentProps {
    x: number,
    y: number,
    size: number,
    rotation: Vector3
}

class Bearing extends React.Component<BearingComponentProps, {}> {
    public static defaultProps = {
        size: 80
    };

    public render() {
        const textBearing = ('000' + Math.trunc(this.props.rotation.y)).slice(-3);

        return (
            <Display
                x={this.props.x}
                y={this.props.y}
                size={this.props.size}
                title="bearing"
                subtitle="degrees"
            >{textBearing}</Display>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        rotation: ShipSelectors.selectShipRotation(state)
    };
};

export default connect(mapStateToProps)(Bearing);
