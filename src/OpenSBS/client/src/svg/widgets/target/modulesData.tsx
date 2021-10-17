import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import ColorPalette from '../../colorPalette';

interface ModulesDataProps {
    x: number,
    y: number,
    trace: EntityTrace,
}

export default class ModulesData extends React.Component<ModulesDataProps, {}> {
    private readonly translation: string;

    constructor(props: ModulesDataProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (this.props.trace.structure.modules.length === 0) {
            return this.renderNoModulesContent();
        }

        const rows = this.props.trace.structure.modules.map(
            (value: string, index: number) => ModulesData.renderRow(value, index)
        );

        return (
            <g transform={this.translation}>
                {rows}
            </g>
        );
    }

    private renderNoModulesContent() {
        return (
            <g transform={this.translation}>
                <text
                    x="100" y="60"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >NO</text>
                <text
                    x="100" y="140"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >MODULES</text>
                <text
                    x="100" y="220"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >DETECTED</text>
            </g>
        );
    }

    private static renderRow(text: string, index: number) {
        const translation = SvgTransforms.translate(0, index * 40)
        return (
            <g transform={translation}>
                <text
                    x="0" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{text}</text>
            </g>
        );
    }
}
