import * as React from 'react';

interface DirectionsOverlayModel {
    r: number,
    visible: boolean,
}

export default class DirectionsOverlay extends React.Component<DirectionsOverlayModel, {}> {
    public render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <g>
                <line
                    x1={-this.props.r} y1="0" x2={this.props.r} y2="0"
                    stroke="#383838" strokeWidth="1"
                    transform="rotate(45)"
                />
                <line
                    x1={-this.props.r} y1="0" x2={this.props.r} y2="0"
                    stroke="#383838" strokeWidth="1"
                    transform="rotate(-45)"
                />
            </g>
        );
    }
}
