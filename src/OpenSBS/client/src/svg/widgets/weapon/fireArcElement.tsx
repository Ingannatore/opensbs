import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import EntitySide from 'models/entitySide';
import ColorPalette from 'svg/colorPalette';

interface FireArcElementProps {
    x: number,
    y: number,
    arcs: string[],
    targetSide: string | undefined,
}

export default class FireArcElement extends React.Component<FireArcElementProps, {}> {
    private readonly translation: string;

    constructor(props: FireArcElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <g transform="scale(1 .5)">
                    <line
                        x1="-40" y1="-40"
                        x2="40" y2="40"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                    />
                    <line
                        x1="-40" y1="40"
                        x2="40" y2="-40"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                    />
                    <circle
                        cx="0" cy="0" r="50"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill="none"
                    />
                    {
                        this.props.arcs.includes(EntitySide.FRONT) &&
                        <path
                            d="M 0 0 L -35 -35 Q 0 -64 35 -35 Z "
                            stroke={ColorPalette.TEXT} strokeWidth="2"
                            fill={ColorPalette.TEXT} fillOpacity=".25"
                        />
                    }
                    {
                        this.props.arcs.includes(EntitySide.RIGHT) &&
                        <g transform="rotate(90)">
                            <path
                                d="M 0 0 L -35 -35 Q 0 -64 35 -35 Z "
                                stroke={ColorPalette.TEXT} strokeWidth="2"
                                fill={ColorPalette.TEXT} fillOpacity=".25"
                            />
                        </g>
                    }
                    {
                        this.props.arcs.includes(EntitySide.REAR) &&
                        <g transform="rotate(180)">
                            <path
                                d="M 0 0 L -35 -35 Q 0 -64 35 -35 Z "
                                stroke={ColorPalette.TEXT} strokeWidth="2"
                                fill={ColorPalette.TEXT} fillOpacity=".25"
                            />
                        </g>
                    }
                    {
                        this.props.arcs.includes(EntitySide.LEFT) &&
                        <g transform="rotate(-90)">
                            <path
                                d="M 0 0 L -35 -35 Q 0 -64 35 -35 Z "
                                stroke={ColorPalette.TEXT} strokeWidth="2"
                                fill={ColorPalette.TEXT} fillOpacity=".25"
                            />
                        </g>
                    }
                </g>
                {this.renderTargetMarker()}
            </g>
        );
    }

    private renderTargetMarker() {
        switch (this.props.targetSide) {
            case EntitySide.FRONT:
                return (
                    <circle
                        cx="0" cy="-14" r="4"
                        stroke={ColorPalette.DANGER}
                        fill={ColorPalette.DANGER}
                    />
                )
            case EntitySide.RIGHT:
                return (
                    <circle
                        cx="36" cy="0" r="4"
                        stroke={ColorPalette.DANGER}
                        fill={ColorPalette.DANGER}
                    />
                )
            case EntitySide.REAR:
                return (
                    <circle
                        cx="0" cy="14" r="4"
                        stroke={ColorPalette.DANGER}
                        fill={ColorPalette.DANGER}
                    />
                )
            case EntitySide.LEFT:
                return (
                    <circle
                        cx="-36" cy="0" r="4"
                        stroke={ColorPalette.DANGER}
                        fill={ColorPalette.DANGER}
                    />
                )
            default: return null;
        }
    }
}
