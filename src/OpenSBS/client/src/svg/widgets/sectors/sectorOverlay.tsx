import * as React from 'react';
import Vector2 from '../../../models/Vector2';
import SvgTransforms from '../../../lib/svgTransforms';
import ColorPalette from '../../colorPalette';

interface SectorOverlayProps {
    x: number,
    y: number,
    size: number,
    sector: Vector2,
}

export default class SectorOverlay extends React.Component<SectorOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        size: 84,
    };

    constructor(props: SectorOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const iconPosition = SvgTransforms.translate(
            this.props.sector.x * this.props.size,
            this.props.sector.y * this.props.size
        );

        return (
            <g transform={this.translation}>
                <g transform={iconPosition}>
                    <use
                        x="-42" y="-42"
                        href="/icons/ui.svg#selector-rect"
                        stroke={ColorPalette.FILLER}
                        strokeWidth={4}
                    />
                </g>
            </g>
        );
    }
}
