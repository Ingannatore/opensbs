import * as React from 'react';

interface EntityMarkerComponentProps {
    x: number,
    y: number
}

export default class EntityMarker extends React.Component<EntityMarkerComponentProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0
    };

    constructor(props: EntityMarkerComponentProps) {
        super(props);
        this.translation = this.props.x || this.props.y ? `translate(${this.props.x} ${this.props.y})` : '';
    }

    public render() {
        return (
            <g transform={this.translation}>
                <use href="#icon-dummy"/>
                <text
                    x="0" y="16"
                    fontSize=".75rem" fill="white" textAnchor="middle"
                >DMY-01</text>
            </g>
        );
    }
}
