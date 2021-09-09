import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import SmallDisplayElement from '../../elements/smallDisplay.element';
import {ShieldSectorModel} from '../../../modules/shield-sector.model';
import ShieldCapacityElement from './shield-capacity.element';
import ShieldCalibrationElement from './shield-calibration.element';
import ButtonElement from '../../elements/button.element';
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
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.label}</text>
                <SmallDisplayElement
                    x={0} y={55}
                    label="Hit Points"
                >{this.props.shieldSector?.currentCapacity ?? 0}</SmallDisplayElement>
                <ShieldCapacityElement
                    x={-25} y={95}
                    base={this.props.shieldSector?.capacity ?? 0}
                    current={this.props.shieldSector?.currentCapacity ?? 0}
                />
                <ShieldCalibrationElement
                    x={5} y={95}
                    value={this.props.shieldSector?.calibration ?? 0}
                    availableCalibrationPoints={this.props.availableCalibrationPoints}
                    onSetCalibration={this.onSetCalibration}
                />
                <SmallDisplayElement
                    x={0} y={335}
                    label="HP/sec"
                >{this.props.shieldSector?.currentRechargeRate ?? 0}</SmallDisplayElement>
                <ButtonElement
                    x={-45} y={370}
                    fontSize={1}
                    width={90} height={30}
                    enabled={!!this.props.shieldSector}
                    onClick={this.onReinforceHandler}
                >REINFORCE</ButtonElement>
            </g>
        );
    }

    private onSetCalibration(value: number) {
        if (!this.props.shieldSector) {
            return;
        }

        this.props.onSetCalibration(this.props.shieldSector?.side, value);
    }

    private onReinforceHandler() {
        if (!this.props.shieldSector) {
            return;
        }

        this.props.onReinforce(this.props.shieldSector.side);
    }
}
