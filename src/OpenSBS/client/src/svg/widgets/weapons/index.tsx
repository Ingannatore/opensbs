import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import PanelElement from '../../elements/panel.element';
import ColorPalette from '../../color-palette';
import ValueElement from '../../elements/value.element';
import ButtonElement from '../../elements/button.element';
import CylinderElement from '../../elements/cylinder.element';

interface WeaponsProps {
    x: number,
    y: number,
}

class WeaponsWidget extends React.Component<WeaponsProps, {}> {
    private readonly translation: string;

    constructor(props: WeaponsProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.reload = this.reload.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={630}>
                <line x1="120" y1="0" x2="120" y2="630" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                <line x1="230" y1="0" x2="230" y2="630" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                <line x1="340" y1="0" x2="340" y2="630" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>

                <g transform="translate(340 0)">
                    <g transform="translate(10 10)">
                        <ButtonElement
                            x={0} y={0}
                            width={90} height={40}
                            fontSize={1.5} color={ColorPalette.WARNING}
                            enabled={true}
                            onClick={this.reload}
                        >ENGAGE</ButtonElement>
                        <ButtonElement
                            x={0} y={50}
                            fontSize={1}
                            width={90} height={30}
                            enabled={true}
                            onClick={this.reload}
                        >RELOAD</ButtonElement>
                        <ValueElement
                            x={45} y={130}
                            label="target"
                        >-</ValueElement>
                    </g>
                    <g transform="translate(10 175)">
                        <CylinderElement
                            x={20} y={0}
                            height={280} ratio={0}
                        />
                        <CylinderElement
                            x={50} y={0}
                            height={280} ratio={.8}
                            uom="#" labels="32 24 16 8"
                            labelsPosition="right"
                        />
                    </g>
                    <g transform="translate(10 500)">
                        <ValueElement
                            x={45} y={0}
                            label="ammo"
                        >TORCH</ValueElement>
                        <ValueElement
                            x={45} y={60}
                            label="magazine"
                        >32</ValueElement>
                    </g>
                    <text
                        x="55" y="595"
                        fontSize="1rem" textAnchor="middle"
                        fill={ColorPalette.HEADER}
                    >Artillery</text>
                    <text
                        x="55" y="615"
                        fontSize="1rem" textAnchor="middle"
                        fill={ColorPalette.HEADER}
                    >Battery</text>
                </g>
            </PanelElement>
        );
    }

    private reload() {}
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {};
};

export default connect(mapStateToProps)(WeaponsWidget);
