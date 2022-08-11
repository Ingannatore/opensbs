import * as React from 'react';
import EntityTrace from '../../../models/entityTrace';
import Naming from '../../../lib/naming';
import Icons from '../../../lib/icons';
import PanelElement from '../../elements/panelElement';
import PanelHeader from '../../elements/panelHeader';
import ScanningData from './scanningData';

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
