import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface PanelElementProps {
    x: number,
    y: number,
    width: number,
    height: number,
    isOffline: boolean,
}

export default class PanelElement extends React.Component<PanelElementProps, {}> {
    private readonly translation: string;
    private readonly path: string;

    public static defaultProps = {
        isOffline: false,
    };

    constructor(props: PanelElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.path = `M 0 10 L 10 0 L ${this.props.width - 10} 0 L ${this.props.width} 10 L ${this.props.width} ${this.props.height - 10} L ${this.props.width - 10} ${this.props.height} L 10 ${this.props.height} L 0 ${this.props.height - 10} Z`
    }

    public render() {
        return (
            <g transform={this.translation}>
                <path
                    d={this.path}
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                    fill={ColorPalette.BACKGROUND}
                    shapeRendering="crispEdges"
                />
                {this.props.children}
                {this.renderOfflineOverlay()}
            </g>
        );
    }

    private renderOfflineOverlay() {
        if (!this.props.isOffline) {
            return null;
        }

        return (
            <g>
                <path
                    d={this.path}
                    stroke="none"
                    fill={ColorPalette.BACKGROUND}
                    shapeRendering="crispEdges"
                    opacity="0.95"
                />
                <path
                    d={this.path}
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                    fill="none"
                    shapeRendering="crispEdges"
                />
                <text
                    x={this.props.width / 2} y={this.props.height / 2}
                    textAnchor="middle" fontSize="5rem"
                    fill={ColorPalette.DANGER}
                >OFFLINE</text>
            </g>
        );
    }
}
