import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import OverlayEvent from 'models/OverlayEvent';

interface ClickableOverlayProps {
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: (event: OverlayEvent) => void,
}

export default class ClickableOverlay extends React.Component<ClickableOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: ClickableOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor="cell" pointerEvents="bounding-box">
                <rect
                    x="0" y="0"
                    width={this.props.width} height={this.props.height}
                    fill="black" stroke="none" opacity="0"
                    onClick={this.clickHandler}
                />
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGRectElement, MouseEvent>) {
        const box = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - box.left;
        const offsetY = event.clientY - box.top;

        this.props.onClick({
            x: offsetX,
            y: offsetY,
            width: box.width,
            height: box.height,
            horizontalDeviation: offsetX / box.width,
            verticalDeviation: offsetY / box.height,
        });
    }
}
