import * as React from 'react';
import Icons from 'lib/icons';
import Naming from 'lib/naming';
import EntityTrace from 'models/entityTrace';
import PanelElement from 'svg/elements/panelElement';
import PanelHeader from 'svg/elements/panelHeader';
import ScanningData from 'svg/widgets/traceScan/scanningData';

interface TraceScanWidgetProps {
    x: number,
    y: number,
    trace: EntityTrace,
    onScanCompleted: () => void,
}

export default class TraceScanWidget extends React.Component<TraceScanWidgetProps, {}> {
    public render() {
        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={390}
            >
                <PanelHeader
                    subtext={Naming.getEntityTypeName(this.props.trace.type)}
                    icon={Icons.forEntity(this.props.trace.type)}
                >{this.props.trace.callSign}</PanelHeader>
                <ScanningData
                    x={0} y={40}
                    trace={this.props.trace}
                    onPuzzleCompleted={this.props.onScanCompleted}
                />
            </PanelElement>
        );
    }
}
