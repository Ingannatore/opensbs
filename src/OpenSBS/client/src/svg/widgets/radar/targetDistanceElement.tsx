import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from '../../../store/client/clientSelectors';
import DisplayElement from '../../elements/display.element';
import EntityTrace from '../../../models/entityTrace';

interface TargetDistanceElementProps {
    x: number,
    y: number,
    target: EntityTrace | null,
}

class TargetDistanceElement extends React.Component<TargetDistanceElementProps, {}> {
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

export default connect(mapStateToProps)(TargetDistanceElement);
