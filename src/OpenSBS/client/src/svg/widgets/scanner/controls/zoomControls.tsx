import * as React from 'react';
import ColorPalette from 'svg/colorPalette';
import ButtonComponent from 'svg/components/buttonComponent';
import ButtonsGroupComponent from 'svg/components/buttonsGroupComponent';

interface ZoomControlsProps {
    x: number,
    y: number,
    value: number,
    onChange: (value: number) => void,
}

export default class ZoomControls extends React.Component<ZoomControlsProps, {}> {
    public render() {
        return (
            <ButtonsGroupComponent x={this.props.x} y={this.props.y} width={160} topLabel="ZOOM LEVEL">
                <line
                    x1="-80" y1="0" x2="80" y2="0"
                    stroke={ColorPalette.SECONDARY} strokeWidth="2"
                />
                <ButtonComponent
                    id="btn-scanner-zoom-1" label="×1"
                    x={-110} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.value == 1}
                    onClick={() => this.props.onChange(1)}
                />
                <ButtonComponent
                    id="btn-scanner-zoom-2" label="×2"
                    x={-30} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.value == 2}
                    onClick={() => this.props.onChange(2)}
                />
                <ButtonComponent
                    id="btn-scanner-zoom-4" label="×4"
                    x={50} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.value == 4}
                    onClick={() => this.props.onChange(4)}
                />
            </ButtonsGroupComponent>
        );
    }
}
