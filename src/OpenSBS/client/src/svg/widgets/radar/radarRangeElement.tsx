import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from '../../../store/client/clientSelectors';
import DisplayElement from '../../elements/displayElement';

interface RadarRangeElementProps {
    x: number,
    y: number,
    radarScale: number,
}

class RadarRangeElement extends React.Component<RadarRangeElementProps, {}> {
    public render() {
        return (
            <DisplayElement
                x={this.props.x} y={this.props.y}
                topLabel="RADAR RANGE"
                bottomLabel="meters"
            >{400 * this.props.radarScale}</DisplayElement>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        radarScale: ClientSelectors.getRadarScale(state)
    };
};

export default connect(mapStateToProps)(RadarRangeElement);
