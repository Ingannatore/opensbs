import * as React from 'react';
import Entity from '../models/entity';
import Vector3 from '../models/vector3';
import Coords from '../lib/coords';
import SvgTransform from '../lib/svg-transform';

interface EntitiesOverlayComponentProps {
    x: number,
    y: number,
    size: number,
    range: number,
    origin: Vector3,
    rotation: Vector3,
    entities: Entity[]
}

export default class EntitiesOverlay extends React.Component<EntitiesOverlayComponentProps, {}> {
    public static defaultProps = {
        x: 0,
        y: 0
    };

    public render() {
        const transform = EntitiesOverlay.createTransform(this.props.x, this.props.y, this.props.rotation);
        const scale = this.props.size / this.props.range;
        const markers = this.props.entities.map((entity: Entity) => this.renderMarker(entity, scale));

        return (
            <g transform={transform}>
                {markers}
            </g>
        );
    }

    private renderMarker(entity: Entity, scale: number) {
        const markerPosition = Coords.scale(Coords.translateOrigin(entity.position, this.props.origin), scale);
        const transform = SvgTransform.translate(markerPosition.x, markerPosition.y);

        return (
            <g transform={transform} key={`entitymarker-${entity.id}`}>
                <use href="#icon-dummy"/>
                <text
                    x="0" y="18"
                    fontSize="1rem" fill="white" textAnchor="middle"
                    transform={SvgTransform.rotate(this.props.rotation.y, 0, 18)}
                >{entity.name}</text>
            </g>
        );
    }

    private static createTransform(x: number, y: number, rotation: Vector3): string {
        let transform = SvgTransform.translate(x, y);
        if (rotation.y) {
            transform += ` ${SvgTransform.rotate(-rotation.y)}`;
        }

        return transform;
    }
}
