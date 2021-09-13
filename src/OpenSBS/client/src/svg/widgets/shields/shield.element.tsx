import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import {ShieldSectorModel} from '../../../modules/shield-sector.model';
import ShieldCalibrationElement from './shield-calibration.element';
import ValueElement from '../../elements/value.element';
import ButtonElement from '../../elements/button.element';
import CylinderElement from '../../elements/cylinder.element';
import ColorPalette from '../../color-palette';

interface ShieldElementProps {
    x: number,
    y: number,
    label: string,
    shieldSector: ShieldSectorModel | undefined,
    availableCalibrationPoints: number,
    onSetCalibration: (side: string, value: number) => void,
    onReinforce: (side: string) => void,
}

export default class ShieldElement extends React.Component<ShieldElementProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onSetCalibration = this.onSetCalibration.bind(this);
        this.onReinforceHandler = this.onReinforceHandler.bind(this);
    }

    public render() {
        if (!this.props.shieldSector) {
            return null;
        }

        const ratio = this.props.shieldSector.currentCapacity / this.props.shieldSector.capacity;
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.label}</text>
                <ValueElement
                    x={0} y={60}
                    label="hit points"
                >{this.props.shieldSector.currentCapacity}</ValueElement>
                <CylinderElement
                    x={-25} y={95}
                    height={206}
                    ratio={ratio}
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
                >{this.props.shieldSector.currentRechargeRate}</ValueElement>
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
