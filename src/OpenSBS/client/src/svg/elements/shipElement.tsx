import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';

interface ShipElementProps {
    x: number,
    y: number,
    bearing: number,
}

export default class ShipElement extends React.Component<ShipElementProps, {}> {
    public static defaultProps = {
        bearing: 0,
    };

    public render() {
        return(
            <g transform={SvgTransforms.translate(this.props.x, this.props.y)}>
                <use
                    x="-6" y="-6"
                    href="/images/icons.svg#icon-ship"
                    transform={SvgTransforms.rotate(this.props.bearing)}
                />
            </g>
        );
    }
}
