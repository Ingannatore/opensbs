import * as React from 'react';
import {connect} from 'react-redux';
import EntityTrace from '../../../models/entityTrace';
import ClientSelectors from '../../../store/client/clientSelectors';
import PanelElement from '../../elements/panelElement';
import Header from './header';
import MainBody from './mainBody';
import ColorPalette from '../../colorPalette';

interface TargetWidgetProps {
    x: number,
    y: number,
    target: EntityTrace | null,
}

class TargetWidget extends React.Component<TargetWidgetProps, {}> {
    public render() {
        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={390}
            >
                <Header x={0} y={0} trace={this.props.target}/>
                <line x1="0" y1="40" x2="450" y2="40" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                <MainBody x={0} y={40} trace={this.props.target}/>
            </PanelElement>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state),
    };
};

export default connect(mapStateToProps)(TargetWidget);
