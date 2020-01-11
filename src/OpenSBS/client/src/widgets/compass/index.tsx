import * as React from 'react';
import {connect} from 'react-redux';
import ShipSelectors from '../../store/selectors/ship';
import Vector3 from '../../models/vector3';
import Container from '../../elements/container';
import Display from '../../elements/display';
import Bezel from '../../elements/bezel';

interface CompassComponentProps {
    x: number,
    y: number,
    rotation: Vector3
}

class Compass extends React.Component<CompassComponentProps, {}> {
    public render() {
        const textBearing = ('000' + Math.trunc(this.props.rotation.y)).slice(-3);

        return (
            <Container size={200} x={this.props.x} y={this.props.y}>
                <Display size={120} title="bearing" subtitle="degrees">{textBearing}</Display>
                <line x1="0" y1="-186" x2="0" y2="-195" stroke="#c9c571" strokeWidth="2"/>
                <line x1="0" y1="-121" x2="0" y2="-134" stroke="#c9c571" strokeWidth="2"/>
                <Bezel size={140} rotation={this.props.rotation.y}/>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        rotation: ShipSelectors.selectShipRotation(state)
    };
};

export default connect(mapStateToProps)(Compass);
