import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';
import BaseComponentProps from "../../models/baseComponentProps";

interface DataRowProps extends BaseComponentProps {
    x: number,
    y: number,
    label: string,
}

export default class DataRow extends React.Component<DataRowProps, {}> {
    private readonly translation: string;

    constructor(props: DataRowProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return(
            <g transform={this.translation}>
                <text
                    x="0" y="25"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.MUTE_LIGHT}
                >{this.props.label}</text>
                <text
                    x="200" y="25"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{this.props.children}</text>
            </g>
        );
    }
}
