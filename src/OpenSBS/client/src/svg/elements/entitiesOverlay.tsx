import * as React from 'react';
import Marker from '../../models/marker';
import SvgTransforms from '../../lib/svg-transforms';

interface EntitiesOverlayProps {
    rotation: number,
    markers: Marker[]
}

export default class EntitiesOverlay extends React.Component<EntitiesOverlayProps, {}> {
    public render() {
        const markers = this.props.markers.map((marker: Marker) => this.renderMarker(marker));

        return (
            <g transform={SvgTransforms.rotate(-this.props.rotation)}>
                {markers}
            </g>
        );
    }

    private renderMarker(marker: Marker) {
        const transform = SvgTransforms.translate(marker.x, marker.y);

        return (
            <g transform={transform} key={`marker-${marker.id}`}>
                <circle x="0" y="0" r="4" stroke="white" fill="none"/>
                <text
                    x="0" y="18"
                    fontSize="1rem" fill="#dedede" textAnchor="middle"
                    transform={SvgTransforms.rotate(this.props.rotation)}
                >{marker.text}</text>
            </g>
        );
    }
}
