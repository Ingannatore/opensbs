import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from '../../../store/client/client.selectors';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import DisplayElement from '../../elements/display.element';
import {SensorsTraceModel} from '../../../modules/sensors-trace.model';

interface TargetPropsModel {
    x: number,
    y: number,
    trace: SensorsTraceModel | undefined,
}

class TargetElement extends React.Component<TargetPropsModel, {}> {
    public render() {
        return (
            <DisplayElement
                x={this.props.x} y={this.props.y}
                topLabel="TARGET DISTANCE"
                bottomLabel="meters"
            >{this.props.trace?.distance?.toString() ?? '-'}</DisplayElement>
        );
    }
}

const mapStateToProps = (state: any) => {
    const target = ClientSelectors.getTarget(state);
    return {
        trace: target ? SpaceshipSelectors.getTrace(state, target) : undefined
    };
};

export default connect(mapStateToProps)(TargetElement);
