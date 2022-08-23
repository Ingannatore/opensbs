import * as React from 'react';
import ColorPalette from 'svg/colorPalette';
import ButtonComponent from 'svg/components/buttonComponent';
import ButtonsGroupComponent from 'svg/components/buttonsGroupComponent';
import ScannerMode from 'svg/widgets/scanner/scannerMode';

interface ModeControlProps {
    x: number,
    y: number,
    value: ScannerMode,
    onChange: (value: ScannerMode) => void,
}

export default class ModeControl extends React.Component<ModeControlProps, {}> {
    public render() {
        return (
            <ButtonsGroupComponent x={this.props.x} y={this.props.y} width={160} bottomLabel="MODE">
                <line
                    x1="-80" y1="0" x2="80" y2="0"
                    stroke={ColorPalette.MAIN} strokeWidth="2"
                />
                <ButtonComponent
                    id="btn-scanner-mode-nav" label="NAV"
                    x={-110} y={-20}
                    width={60} height={40}
                    toggled={this.props.value == ScannerMode.Navigation}
                    onClick={() => this.props.onChange(ScannerMode.Navigation)}
                />
                <ButtonComponent
                    id="btn-scanner-mode-tac" label="TAC"
                    x={-30} y={-20}
                    width={60} height={40}
                    toggled={this.props.value == ScannerMode.Tactical}
                    onClick={() => this.props.onChange(ScannerMode.Tactical)}
                />
                <ButtonComponent
                    id="btn-scanner-mode-sci" label="SCI"
                    x={50} y={-20}
                    width={60} height={40}
                    toggled={this.props.value == ScannerMode.Scientific}
                    onClick={() => this.props.onChange(ScannerMode.Scientific)}
                />
            </ButtonsGroupComponent>
        );
    }
}
