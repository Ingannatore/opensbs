﻿import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ShieldSector from '../../../modules/shields/shieldSector';
import ShieldCalibrationElement from './shieldCalibrationElement';
import ValueElement from '../../elements/valueElement';
import ButtonElement from '../../elements/buttonElement';
import CylinderElement from '../../elements/cylinderElement';
import ShieldService from '../../../modules/shields/shieldService';
import ColorPalette from '../../colorPalette';

interface ShieldSectorElementProps {
    x: number,
    y: number,
    shieldSector: ShieldSector | undefined,
    availableCalibrationPoints: number,
    onSetCalibration: (side: string, value: number) => void,
    onReinforce: (side: string) => void,
}

export default class ShieldSectorElement extends React.Component<ShieldSectorElementProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldSectorElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onSetCalibration = this.onSetCalibration.bind(this);
        this.onReinforceHandler = this.onReinforceHandler.bind(this);
    }

    public render() {
        if (!this.props.shieldSector) {
            return null;
        }

        return (
            <g transform={this.translation}>
                <text
                    x="0" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{ShieldService.getSectorName(this.props.shieldSector)}</text>
                <ValueElement
                    x={0} y={60}
                    label="hit points"
                >{this.props.shieldSector.capacity}</ValueElement>
                <CylinderElement
                    x={-25} y={95}
                    height={206}
                    ratio={this.props.shieldSector.ratio}
                />
                <ShieldCalibrationElement
                    x={5} y={95}
                    value={this.props.shieldSector.calibration}
                    availableCalibrationPoints={this.props.availableCalibrationPoints}
                    onSetCalibration={this.onSetCalibration}
                />
                <ValueElement
                    x={0} y={340}
                    label="HP/sec"
                >{this.props.shieldSector.rechargeRate}</ValueElement>
                <ButtonElement
                    x={-45} y={370}
                    fontSize={1}
                    width={90} height={30}
                    enabled={true}
                    onClick={this.onReinforceHandler}
                >REINFORCE</ButtonElement>
            </g>
        );
    }

    private onSetCalibration(value: number) {
        if (!this.props.shieldSector) {
            return;
        }

        this.props.onSetCalibration(this.props.shieldSector.side, value);
    }

    private onReinforceHandler() {
        if (!this.props.shieldSector) {
            return;
        }

        this.props.onReinforce(this.props.shieldSector.side);
    }
}
