import * as React from 'react';
import {connect} from 'react-redux';
import EntityTrace from 'models/entityTrace';
import SensorsModule from 'modules/sensors/sensorsModule';
import ClientSelectors from 'store/client/clientSelectors';
import SpaceshipActions from 'store/spaceship/spaceshipActions';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import PanelElement from 'svg/elements/panelElement';
import TraceInfoWidget from 'svg/widgets/traceInfo';
import TraceScanWidget from 'svg/widgets/traceScan';

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
