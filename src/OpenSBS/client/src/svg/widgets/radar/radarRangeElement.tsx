import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from '../../../store/client/clientSelectors';
import DisplayElement from '../../elements/display.element';

interface RadarRangeElementProps {
    x: number,
    y: number,
    zoomFactor: number,
}

class RadarRangeElement extends React.Component<RadarRangeElementProps, {}> {
    public render() {
        const range = Math.round(8000 * (1 / this.props.zoomFactor));
        return (
            <DisplayElement
                x={this.props.x} y={this.props.y}
                topLabel="RADAR RANGE"
                bottomLabel="meters"
            >{range}</DisplayElement>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        zoomFactor: ClientSelectors.getZoomFactor(state)
    };
};

export default connect(mapStateToProps)(RadarRangeElement);
