import * as React from 'react';
import EntityTrace from '../../../models/entityTrace';
import Naming from '../../../lib/naming';
import Icons from '../../../lib/icons';
import PanelElement from '../../elements/panelElement';
import PanelHeader from '../../elements/panelHeader';
import ShieldData from './shieldData';
import SpatialData from './spatialData';
import ReputationData from './reputationData';
import ColorPalette from '../../colorPalette';

interface TraceInfoWidgetProps {
    x: number,
    y: number,
    trace: EntityTrace,
}

export default class TraceInfoWidget extends React.Component<TraceInfoWidgetProps, {}> {
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
                <g transform="translate(0, 40)">
                    <ShieldData
                        x={0} y={0}
                        data={this.props.trace.shield}
                    />
                    <line
                        x1="220" y1="0"
                        x2="220" y2="350"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                    />
                    <SpatialData
                        x={230} y={0}
                        data={this.props.trace.spatial}
                    />
                    <ReputationData
                        x={230} y={300}
                        reputation={this.props.trace.reputation}
                    />
                </g>
            </PanelElement>
        );
    }
}
