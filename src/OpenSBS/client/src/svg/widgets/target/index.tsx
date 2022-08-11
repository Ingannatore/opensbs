import * as React from 'react';
import {connect} from 'react-redux';
import EntityTrace from '../../../models/entityTrace';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import PanelElement from '../../elements/panelElement';
import TraceInfoWidget from '../traceInfo';
import TraceScanWidget from '../traceScan';
import ClientSelectors from '../../../store/client/clientSelectors';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import SpaceshipActions from '../../../store/spaceship/spaceshipActions';

interface TargetWidgetProps {
    x: number,
    y: number,
    trace: EntityTrace | null,
    sensors: SensorsModule | undefined,
    entityId: string,
    dispatch: any,
}

class TargetWidget extends React.Component<TargetWidgetProps, {}> {
    constructor(props: TargetWidgetProps) {
        super(props);

        this.onScanCompleted = this.onScanCompleted.bind(this);
    }

    public render() {
        if (!this.props.trace) {
            return (
                <PanelElement x={this.props.x} y={this.props.y} width={450} height={390}/>
            );
        }

        if (this.props.trace.scanLevel > 0) {
            return (
                <TraceInfoWidget x={this.props.x} y={this.props.y} trace={this.props.trace}/>
            )
        }

        return (
            <TraceScanWidget
                x={this.props.x} y={this.props.y}
                trace={this.props.trace}
                onScanCompleted={this.onScanCompleted}
            />
        );
    }

    private onScanCompleted() {
        if (!this.props.trace || !this.props.sensors) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.sensors.id,
            'scanCompleted',
            this.props.trace.id,
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        trace: ClientSelectors.getSelectedTarget(state),
        sensors: SpaceshipSelectors.getSensors(state),
        entityId: SpaceshipSelectors.getId(state),
    };
};

export default connect(mapStateToProps)(TargetWidget);
