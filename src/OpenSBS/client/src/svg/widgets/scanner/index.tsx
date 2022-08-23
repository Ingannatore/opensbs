import * as React from 'react';
import {connect} from 'react-redux';
import SensorsModule from 'modules/sensors/sensorsModule';
import ClientSelectors from 'store/client/clientSelectors';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import PanelElement from 'svg/elements/panelElement';
import ModeControls from 'svg/widgets/scanner/controls/modeControls';
import NavigationMode from 'svg/widgets/scanner/navigationMode';
import ScannerMode from 'svg/widgets/scanner/scannerMode';

interface ScannerWidgetProps {
    x: number,
    y: number,
    mode: ScannerMode,
    bearing: number,
    sensors: SensorsModule | undefined,
}

class ScannerWidget extends React.Component<ScannerWidgetProps, {}> {
    public static defaultProps = {
        mode: ScannerMode.Navigation,
    };

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000} isOffline={!this.props.sensors}>
                <ModeControls
                    x={880} y={30}
                    currentMode={this.props.mode}
                    onChange={() => {}}
                />
                {this.renderContent()}
                <circle
                    cx="500" cy="500" r="460"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    fill="none"
                />
            </PanelElement>
        );
    }

    private renderContent() {
        switch (this.props.mode) {
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
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state),
        bearing: SpaceshipSelectors.getBearing(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(ScannerWidget);
