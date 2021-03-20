import * as React from 'react';

interface RangesOverlayModel {
    range: number,
    visible: boolean,
}

export default class RangesOverlay extends React.Component<RangesOverlayModel, {}> {
    public render() {
        if (!this.props.visible) {
            return null;
        }

        const rangeIncrement = this.props.range / 4;
        return (
            <g>
                <text x="106" y="-8" fontSize=".75rem" fill="#76797c" textAnchor="end">{rangeIncrement}</text>
                <circle cx="0" cy="0" r="110" stroke="#616161" fill="none" strokeDasharray="2 4"/>

                <text x="216" y="-8" fontSize=".75rem" fill="#76797c" textAnchor="end">{rangeIncrement * 2}</text>
                <circle cx="0" cy="0" r="220" stroke="#616161" fill="none" strokeDasharray="2 4"/>

                <text x="326" y="-8" fontSize=".75rem" fill="#76797c" textAnchor="end">{rangeIncrement * 3}</text>
                <circle cx="0" cy="0" r="330" stroke="#616161" fill="none" strokeDasharray="2 4"/>

                <text x="436" y="-8" fontSize=".75rem" fill="#76797c" textAnchor="end">{rangeIncrement * 4}</text>
                <circle cx="0" cy="0" r="440" stroke="#616161" fill="none" strokeDasharray="2 4"/>
            </g>
        );
    }
}
