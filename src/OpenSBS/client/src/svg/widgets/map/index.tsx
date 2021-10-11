import * as React from 'react';
import {connect} from 'react-redux';
import PanelElement from '../../elements/panelElement';
import TracesOverlayElement from './tracesOverlayElement';
import GridOverlayElement from './gridOverlayElement';
import ShipOverlayElement from './shipOverlayElement';

interface MapWidgetProps {
    x: number,
    y: number,
}

class MapWidget extends React.Component<MapWidgetProps, {}> {
    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                <GridOverlayElement x={500} y={500}/>
                <ShipOverlayElement x={500} y={500}/>
                <TracesOverlayElement x={500} y={500}/>
            </PanelElement>
        );
    }
}

export default connect()(MapWidget);
