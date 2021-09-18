import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from '../../../store/client/client.selectors';
import DisplayElement from '../../elements/display.element';
import EntityTraceModel from '../../../modules/entity-trace.model';

interface TargetPropsModel {
    x: number,
    y: number,
    target: EntityTraceModel | null,
}

class TargetElement extends React.Component<TargetPropsModel, {}> {
    public render() {
        return (
            <DisplayElement
                x={this.props.x} y={this.props.y}
                topLabel="TARGET DISTANCE"
                bottomLabel="meters"
            >{this.props.target?.distance.toString() ?? '-'}</DisplayElement>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state)
    };
};

export default connect(mapStateToProps)(TargetElement);
