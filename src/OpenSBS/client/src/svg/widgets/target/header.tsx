import * as React from 'react';
import Icons from '../../../lib/icons';
import Naming from '../../../lib/naming';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import ColorPalette from '../../colorPalette';

interface HeaderProps {
    x: number,
    y: number,
    trace: EntityTrace | null,
}

export default class Header extends React.Component<HeaderProps, {}> {
    private readonly translation: string;

    constructor(props: HeaderProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="10" y="20"
                    textAnchor="start" fontSize="1.5rem"
                    fill={ColorPalette.FILLER}
                >{this.props.trace?.callSign ?? 'IDLE'}</text>
                {
                    this.props.trace &&
                    <text
                        x="400" y="20"
                        fontSize="1.25rem" textAnchor="end"
                        fill={ColorPalette.MUTE_LIGHT}
                    >{Naming.getEntityTypeName(this.props.trace.type)}</text>
                }
                {
                    this.props.trace &&
                    <g transform="translate(420 20)">
                        <use
                            x="-16" y="-16"
                            href={Icons.forEntity(this.props.trace.type)}
                            stroke={ColorPalette.TEXT} fill={ColorPalette.TEXT}
                            transform="scale(.75)"
                        />
                    </g>
                }
            </g>
        );
    }
}
