import * as React from 'react';
import {AlertLevels} from '../../models/alertLevels';
import SvgTransforms from '../../lib/svg-transforms';
import Display from '../elements/display';

interface AlertDisplayProps {
    x: number,
    y: number,
    level: string,
}

export default class AlertDisplay extends React.Component<AlertDisplayProps> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        level: AlertLevels.Normal,
    };

    constructor(props: AlertDisplayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <Display
                x={this.props.x} y={this.props.y}
                title={'status'} subtitle={'alert level'}
                border={this.getBorderColour()} text={this.getTextColour()}
            >{this.props.level}</Display>
        );
    }

    private getBorderColour() {
        switch (this.props.level) {
            case AlertLevels.Normal:
                return '#383838';
            case AlertLevels.Yellow:
                return '#ffaf5f';
            case AlertLevels.Red:
                return '#ffa48e';
        }
    }

    private getTextColour() {
        switch (this.props.level) {
            case AlertLevels.Normal:
                return '#dedede';
            case AlertLevels.Yellow:
                return '#ffaf5f';
            case AlertLevels.Red:
                return '#ffa48e';
        }
    }
}
