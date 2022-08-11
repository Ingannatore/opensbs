import * as React from 'react';
import {connect} from 'react-redux';
import Coords from 'lib/coords';
import OverlayEvent from 'models/OverlayEvent';
import Vector2 from 'models/vector2';
import Vector3 from 'models/vector3';
import SensorsModule from 'modules/sensors/sensorsModule';
import ClientSelectors from 'store/client/clientSelectors';
import {selectSector} from 'store/client/clientSlice';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import ClickableOverlay from 'svg/elements/clickableOverlay';
import PanelElement from 'svg/elements/panelElement';
import SwitchElement from 'svg/elements/switchElement';
import GridOverlay from 'svg/widgets/sectors/gridOverlay';
import SectorOverlay from 'svg/widgets/sectors/sectorOverlay';
import TracesOverlay from 'svg/widgets/sectors/tracesOverlay';

interface SectorsWidgetProps {
    x: number,
    y: number,
    selectedSector: Vector2,
    position: Vector3,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

interface SectorsWidgetState {
    isGridOverlayVisible: boolean,
    isSensorsOverlayVisible: boolean,
    isTracesOverlayVisible: boolean,
}

class SectorsWidget extends React.Component<SectorsWidgetProps, SectorsWidgetState> {
    private readonly scaleFactor = 420 / 250000;

    constructor(props: SectorsWidgetProps) {
        super(props);
        this.state = {
            isGridOverlayVisible: true,
            isSensorsOverlayVisible: true,
            isTracesOverlayVisible: true,
        };

        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.toggleGridOverlay = this.toggleGridOverlay.bind(this);
        this.toggleSensorsOverlay = this.toggleSensorsOverlay.bind(this);
        this.toggleTracesOverlay = this.toggleTracesOverlay.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={490}>
                <line
                    x1="0" y1="440" x2="450" y2="440"
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                />
                <g transform="translate(20, 10)">
                    <GridOverlay visible={this.state.isGridOverlayVisible}/>
                    <g transform="translate(210, 210)">
                        {this.state.isSensorsOverlayVisible && this.renderSensorsCoverage()}
                        <TracesOverlay
                            traces={this.props.sensors.traces}
                            scale={this.scaleFactor}
                            visible={this.state.isTracesOverlayVisible}
                        />
                        <SectorOverlay sector={this.props.selectedSector}/>
                    </g>
                    <ClickableOverlay
                        width={420} height={420}
                        onClick={this.onOverlayClick}
                    />
                </g>
                <g transform="translate(20, 450)">
                    <SwitchElement
                        x={0} y={0}
                        width={120} height={30} fontSize={1}
                        onClick={this.toggleGridOverlay}
                        toggled={this.state.isGridOverlayVisible}
                    >GRID</SwitchElement>
                    <SwitchElement
                        x={150} y={0}
                        width={120} height={30} fontSize={1}
                        onClick={this.toggleSensorsOverlay}
                        toggled={this.state.isSensorsOverlayVisible}
                    >SENSORS</SwitchElement>
                    <SwitchElement
                        x={300} y={0}
                        width={120} height={30} fontSize={1}
                        onClick={this.toggleTracesOverlay}
                        toggled={this.state.isTracesOverlayVisible}
                    >TRACES</SwitchElement>
                </g>
            </PanelElement>
        );
    }

    private renderSensorsCoverage() {
        if (!this.props.sensors) {
            return null;
        }

        const position = Coords.scale(this.props.position, this.scaleFactor);
        return (
            <circle
                cx={position.x} cy={-position.z}
                r={this.props.sensors.range * this.scaleFactor}
                stroke="none" fill={ColorPalette.TEXT}
                opacity={.075}
            />
        );
    }

    private onOverlayClick(event: OverlayEvent) {
        const sector: Vector2 = {
            x: Math.floor(event.horizontalDeviation / .2) - 2,
            y: Math.floor(event.verticalDeviation / .2) - 2,
        }

        if (sector.x !== this.props.selectedSector.x || sector.y !== this.props.selectedSector.y) {
            this.props.dispatch(selectSector(sector));
        }
    }

    private toggleGridOverlay() {
        this.setState({
            ...this.state,
            isGridOverlayVisible: !this.state.isGridOverlayVisible
        });
    }

    private toggleSensorsOverlay() {
        this.setState({
            ...this.state,
            isSensorsOverlayVisible: !this.state.isSensorsOverlayVisible
        });
    }

    private toggleTracesOverlay() {
        this.setState({
            ...this.state,
            isTracesOverlayVisible: !this.state.isTracesOverlayVisible
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        selectedSector: ClientSelectors.getSelectedSector(state),
        position: SpaceshipSelectors.getPosition(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(SectorsWidget);
