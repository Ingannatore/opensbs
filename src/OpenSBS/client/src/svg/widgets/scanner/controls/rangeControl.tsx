import * as React from 'react';
import ColorPalette from 'svg/colorPalette';
import ButtonComponent from 'svg/components/buttonComponent';
import ButtonsGroupComponent from 'svg/components/buttonsGroupComponent';

interface RangeControlProps {
    x: number,
    y: number,
    value: number,
    maxValue: number,
    onChange: (value: number) => void,
}

export default class RangeControl extends React.Component<RangeControlProps, {}> {
    public render() {
        return (
            <ButtonsGroupComponent x={this.props.x} y={this.props.y} width={160} bottomLabel="RANGE">
                <line
                    x1="-80" y1="0" x2="80" y2="0"
                    stroke={ColorPalette.SECONDARY} strokeWidth="2"
                />
                <ButtonComponent
                    id="btn-scanner-range-5" label="5K"
                    x={-110} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.value === 5000}
                    onClick={() => this.props.onChange(5000)}
                />
                <ButtonComponent
                    id="btn-scanner-range-10" label="10K"
                    x={-30} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.value === 10000}
                    onClick={() => this.props.onChange(10000)}
                />
                <ButtonComponent
                    id="btn-scanner-range-max" label="MAX"
                    x={50} y={-20}
                    width={60} height={40}
                    color={ColorPalette.SECONDARY}
                    toggled={this.props.value === this.props.maxValue}
                    onClick={() => this.props.onChange(this.props.maxValue)}
                />
            </ButtonsGroupComponent>
        );
    }
}
