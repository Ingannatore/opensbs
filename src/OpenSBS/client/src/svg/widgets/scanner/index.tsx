import SensorsModule from 'modules/sensors/sensorsModule';
import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from 'store/client/clientSelectors';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import PanelElement from 'svg/elements/panelElement';
import ModeControl from 'svg/widgets/scanner/controls/modeControl';
import NavigationMode from 'svg/widgets/scanner/modes/navigationMode';
import ScannerMode from 'svg/widgets/scanner/scannerMode';

interface ScannerWidgetProps {
    x: number,
    y: number,
    bearing: number,
    defaultMode?: ScannerMode,
    sensors?: SensorsModule,
}

interface ScannerWidgetState {
    mode: ScannerMode,
}

class ScannerWidget extends React.Component<ScannerWidgetProps, ScannerWidgetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            mode: this.props.defaultMode || ScannerMode.Navigation,
        }

        this.onChangeModeHandler = this.onChangeModeHandler.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000} isOffline={!this.props.sensors}>
                <ModeControl
                    x={880} y={30}
                    value={this.state.mode}
                    onChange={this.onChangeModeHandler}
                />
                {this.renderContent()}
            </PanelElement>
        );
    }

    private renderContent() {
        switch (this.state.mode) {
            case ScannerMode.Navigation:
                return (
                    <NavigationMode
                        x={0} y={0}
                        bearing={this.props.bearing}
                        sensors={this.props.sensors}
                    />
                );
            default:
                return null;
        }
    }

    private onChangeModeHandler(value: ScannerMode) {
        this.setState({
            ...this.state,
            mode: value,
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state),
        bearing: SpaceshipSelectors.getBearing(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(ScannerWidget);
