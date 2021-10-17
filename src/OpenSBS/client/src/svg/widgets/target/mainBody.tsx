import * as React from 'react';
import EntityTrace from '../../../models/entityTrace';
import Tabs from '../../commons/tabs';
import TabPage from '../../commons/tabPage';
import SpatialData from './spatialData';
import ShieldData from './shieldData';
import HullData from './hullData';
import ModulesData from './modulesData';
import ColorPalette from '../../colorPalette';

interface MainBodyProps {
    x: number,
    y: number,
    trace: EntityTrace,
}

export default class MainBody extends React.Component<MainBodyProps, {}> {
    public render() {
        return (
            <Tabs x={this.props.x} y={this.props.y} width={450}>
                <TabPage label="INFO">
                    <ShieldData x={10} y={0} trace={this.props.trace}/>
                    <line x1="210" y1="0" x2="210" y2="280" stroke={ColorPalette.MUTE_DARK} strokeWidth="1"/>
                    <SpatialData x={220} y={0} trace={this.props.trace}/>
                </TabPage>
                <TabPage label="HULL">
                    <HullData x={100} y={80} trace={this.props.trace}/>
                    <line x1="210" y1="0" x2="210" y2="280" stroke={ColorPalette.MUTE_DARK} strokeWidth="1"/>
                    <ModulesData x={220} y={0} trace={this.props.trace}/>
                </TabPage>
            </Tabs>
        );
    }
}
