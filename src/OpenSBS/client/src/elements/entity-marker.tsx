import * as React from 'react';
import SvgTransforms from '../lib/svg-transforms';

interface EntityMarkerComponentProps {
    x: number,
    y: number
}

export default class EntityMarker extends React.Component<EntityMarkerComponentProps, {}> {
    public static defaultProps = {
        x: 0,
        y: 0
    };

    public render() {
        const transform = SvgTransforms.translate(this.props.x, this.props.y);
        return (
            <g transform={transform}>
                <use href="#icon-dummy"/>
                <text
                    x="0" y="16"
                    fontSize=".75rem" fill="white" textAnchor="middle"
                >DMY-01</text>
            </g>
        );
    }
}
