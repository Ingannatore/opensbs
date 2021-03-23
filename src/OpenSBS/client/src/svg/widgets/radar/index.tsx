import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import DirectionsOverlay from './directions.overlay';
import RangesOverlay from './ranges.overlay';
import ButtonElement from '../../elements/button.element';
import TracesOverlay from './traces.overlay';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import {SensorsModuleModel} from '../../../modules/sensors-module.model';
import Vector3 from '../../../models/vector3';

interface RadarProps {
    x: number,
    y: number,
    direction: Vector3,
    sensorsModule: SensorsModuleModel,
}

interface RadarState {
    range: number,
    enableDirectionsOverlay: boolean,
    enableRangesOverlay: boolean,
    enableWeaponsOverlay: boolean,
}

class Radar extends React.Component<RadarProps, RadarState> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            range: 8000,
            enableDirectionsOverlay: true,
            enableRangesOverlay: true,
            enableWeaponsOverlay: false,
        };
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);

        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
        this.toggleWeaponsOverlay = this.toggleWeaponsOverlay.bind(this);
        this.setRange = this.setRange.bind(this);
    }

    render() {
        return (
            <g transform={this.translation}>
                <g transform="translate(470 470)">
                    <circle
                        cx="0" cy="0" r="470"
                        stroke="#383838" strokeWidth="2" fill="black"
                    />
                    <RangesOverlay
                        range={this.state.range}
                        visible={this.state.enableRangesOverlay}
                    />
                    <DirectionsOverlay
                        r={470}
                        visible={this.state.enableDirectionsOverlay}
                    />
                    <TracesOverlay
                        range={this.state.range}
                        direction={this.props.direction}
                        markers={this.props.sensorsModule?.traces ?? []}
                    />
                    <use href="#icon-ship" x="-6" y="-6"/>

                    <g transform="translate(-370 370)">
                        <ButtonElement
                            x={-70} y={-70}
                            subtitle="OVERLAY"
                            onClick={this.toggleDirectionsOverlay}
                            toggled={this.state.enableDirectionsOverlay}
                        >DIR</ButtonElement>
                        <ButtonElement
                            x={0} y={0}
                            subtitle="OVERLAY"
                            onClick={this.toggleRangesOverlay}
                            toggled={this.state.enableRangesOverlay}
                        >RNG</ButtonElement>
                        <ButtonElement
                            x={70} y={70}
                            subtitle="OVERLAY"
                            enabled={false}
                            onClick={this.toggleWeaponsOverlay}
                            toggled={this.state.enableWeaponsOverlay}
                        >WPN</ButtonElement>
                    </g>

                    <g transform="translate(370 370)">
                        <ButtonElement
                            id="btn-radar-range-8000"
                            x={70} y={-70}
                            subtitle="RANGE"
                            onClick={this.setRange}
                            toggled={this.state.range === 8000}
                        >8km</ButtonElement>
                        <ButtonElement
                            id="btn-radar-range-4000"
                            x={0} y={0}
                            subtitle="RANGE"
                            onClick={this.setRange}
                            toggled={this.state.range === 4000}
                        >4km</ButtonElement>
                        <ButtonElement
                            id="btn-radar-range-2000"
                            x={-70} y={70}
                            subtitle="RANGE"
                            onClick={this.setRange}
                            toggled={this.state.range === 2000}
                        >2km</ButtonElement>
                    </g>
                </g>
            </g>
        );
    }

    private toggleDirectionsOverlay() {
        this.setState({
            ...this.state,
            enableDirectionsOverlay: !this.state.enableDirectionsOverlay
        });
    }

    private toggleRangesOverlay() {
        this.setState({
            ...this.state,
            enableRangesOverlay: !this.state.enableRangesOverlay
        });
    }

    private toggleWeaponsOverlay() {
        this.setState({
            ...this.state,
            enableWeaponsOverlay: !this.state.enableWeaponsOverlay
        });
    }

    private setRange(event: React.MouseEvent<SVGElement, MouseEvent>, id: string | null) {
        switch (id) {
            case 'btn-radar-range-4000':
                this.setState({...this.state, range: 4000});
                break;
            case 'btn-radar-range-2000':
                this.setState({...this.state, range: 2000});
                break;
            default:
                this.setState({...this.state, range: 8000});
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        direction: SpaceshipSelectors.getDirection(state),
        sensorsModule: SpaceshipSelectors.getModuleByType(state, 'module.sensors') as SensorsModuleModel
    };
};

export default connect(mapStateToProps)(Radar);
