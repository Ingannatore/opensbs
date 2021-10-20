import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import SpatialData from './spatialData';
import ShieldData from './shieldData';
import ColorPalette from '../../colorPalette';

interface MainBodyProps {
    x: number,
    y: number,
    trace: EntityTrace | null,
}

export default class MainBody extends React.Component<MainBodyProps, {}> {
    private readonly translation: string;

    constructor(props: MainBodyProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.trace) {
            return null;
        }

        return (
            <g transform={this.translation}>
                <ShieldData x={0} y={0} trace={this.props.trace}/>
                <line x1="220" y1="0" x2="220" y2="350" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                <SpatialData x={230} y={0} trace={this.props.trace}/>
            </g>
        );
    }
}
