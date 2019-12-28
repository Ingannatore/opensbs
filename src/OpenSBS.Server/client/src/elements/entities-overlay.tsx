import * as React from 'react';
import Entity from '../models/entity';

interface EntitiesOverlayComponentProps {
    x: number,
    y: number,
    size: number,
    range: number,
    entities: Entity[]
}

export default class EntitiesOverlay extends React.Component<EntitiesOverlayComponentProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0
    };

    constructor(props: EntitiesOverlayComponentProps) {
        super(props);
        this.translation = this.props.x || this.props.y ? `translate(${this.props.x} ${this.props.y})` : '';
    }

    public render() {
        const scale = this.props.size / this.props.range;
        const markers = this.props.entities
            .map((entity: Entity) => EntitiesOverlay.renderMarker(entity, scale));

        return (
            <g transform={this.translation}>
                {markers}
            </g>
        );
    }

    private static renderMarker(entity: Entity, scale: number) {
        const x = entity.position.x * scale;
        const y = entity.position.y * scale;
        const translation = `translate(${x} ${y})`;

        return (
            <g transform={translation} key={`entity-${entity.id}`}>
                <use href="#icon-dummy"/>
                <text
                    x="0" y="18"
                    fontSize="1rem" fill="white" textAnchor="middle"
                >{entity.name}</text>
            </g>
        );
    }
}
