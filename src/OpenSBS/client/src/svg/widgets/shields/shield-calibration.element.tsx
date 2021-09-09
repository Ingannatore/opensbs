import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import CalibrationSegmentElement from './calibration-segment.element';

interface ShieldCalibrationProps {
    x: number,
    y: number,
    value: number,
    availableCalibrationPoints: number,
    onSetCalibration: (value: number) => void,
}

export default class ShieldCalibrationElement extends React.Component<ShieldCalibrationProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldCalibrationProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <CalibrationSegmentElement
                    x={0} y={0}
                    enabled={this.props.value + this.props.availableCalibrationPoints >= 5}
                    toggled={this.props.value >= 5}
                    onClick={() => this.props.onSetCalibration(5)}
                >5</CalibrationSegmentElement>
                <CalibrationSegmentElement
                    x={0} y={41}
                    enabled={this.props.value + this.props.availableCalibrationPoints >= 4}
                    toggled={this.props.value >= 4}
                    onClick={() => this.props.onSetCalibration(4)}
                >4</CalibrationSegmentElement>
                <CalibrationSegmentElement
                    x={0} y={82}
                    enabled={this.props.value + this.props.availableCalibrationPoints >= 3}
                    toggled={this.props.value >= 3}
                    onClick={() => this.props.onSetCalibration(3)}
                >3</CalibrationSegmentElement>
                <CalibrationSegmentElement
                    x={0} y={123}
                    enabled={this.props.value + this.props.availableCalibrationPoints >= 2}
                    toggled={this.props.value >= 2}
                    onClick={() => this.props.onSetCalibration(2)}
                >2</CalibrationSegmentElement>
                <CalibrationSegmentElement
                    x={0} y={164}
                    enabled={this.props.value + this.props.availableCalibrationPoints >= 1}
                    toggled={this.props.value >= 1}
                    onClick={() => this.props.onSetCalibration(1)}
                >1</CalibrationSegmentElement>
            </g>
        );
    }
}
