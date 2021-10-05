import * as React from 'react';
import ColorPalette from '../../colorPalette';

interface DirectionsOverlayElementProps {
    r: number,
    visible: boolean,
}

export default class DirectionsOverlayElement extends React.Component<DirectionsOverlayElementProps, {}> {
    public render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <g>
                <line
                    x1={-this.props.r} y1="0" x2={this.props.r} y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="1"
                    transform="rotate(45)"
                />
                <line
                    x1={-this.props.r} y1="0" x2={this.props.r} y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="1"
                    transform="rotate(-45)"
                />
            </g>
        );
    }
}
