import * as React from 'react';
import ColorPalette from 'svg/colorPalette';
import ButtonComponent from 'svg/components/buttonComponent';
import ButtonsGroupComponent from 'svg/components/buttonsGroupComponent';
import OverlayType from 'svg/widgets/scanner/overlays/overlayType';

interface OverlaysControlProps {
    x: number,
    y: number,
    values: Record<OverlayType, boolean>,
    onToggle: (value: OverlayType) => void,
}

export default class OverlaysControl extends React.Component<OverlaysControlProps, {}> {
    public render() {
        return (
            <ButtonsGroupComponent x={this.props.x} y={this.props.y} width={160} topLabel="OVERLAYS">
                <ButtonComponent
                    id="btn-scanner-overlay-ranges" label="RNG"
                    x={-110} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.values[OverlayType.Ranges]}
                    onClick={() => this.props.onToggle(OverlayType.Ranges)}
                />
                <ButtonComponent
                    id="btn-scanner-overlay-sides" label="SDS"
                    x={-30} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.values[OverlayType.Sides]}
                    onClick={() => this.props.onToggle(OverlayType.Sides)}
                />
                <ButtonComponent
                    id="btn-scanner-overlay-traces" label="TRS"
                    x={50} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.values[OverlayType.Traces]}
                    onClick={() => this.props.onToggle(OverlayType.Traces)}
                />
            </ButtonsGroupComponent>
        );
    }
}
