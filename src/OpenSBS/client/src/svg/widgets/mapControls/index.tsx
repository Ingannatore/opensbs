import * as React from 'react';
import {connect} from 'react-redux';
import PanelElement from '../../elements/panelElement';
import SwitchElement from '../../elements/switchElement';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import ColorPalette from '../../colorPalette';

interface MapControlsWidgetProps {
    x: number,
    y: number,
    mapScale: number,
    dispatch: any,
}

class MapControlsWidget extends React.Component<MapControlsWidgetProps, {}> {
    private readonly scales = [200, 150, 100, 80, 60, 40, 20, 10, 5];

    constructor(props: MapControlsWidgetProps) {
        super(props);

        this.setMapScale = this.setMapScale.bind(this)
    }

    public render() {
        const switches = this.scales.map((scale: number, index: number) => <SwitchElement
            key={'map-zoom-switch-' + scale}
            x={20 + (index * 48.5)} y={10} rx={10}
            width={30} height={30}
            fontSize={1.25} color={ColorPalette.SECONDARY}
            onClick={() => this.setMapScale(scale)}
            toggled={this.props.mapScale === scale}
        >{index + 1}</SwitchElement>);

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={270}>
                <text
                    x="230" y="20"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >ZOOM FACTOR</text>
                <g transform="translate(0 30)">
                    <line
                        x1="40" y1="25"
                        x2="430" y2="25"
                        stroke={ColorPalette.SECONDARY} strokeWidth="2"
                    />
                    {switches}
                </g>
            </PanelElement>
        );
    }

    private setMapScale(value: number) {
        this.props.dispatch(ClientActions.setMapScale(value));
    }
}

const mapStateToProps = (state: any) => {
    return {
        mapScale: ClientSelectors.getMapScale(state)
    };
};

export default connect(mapStateToProps)(MapControlsWidget);
