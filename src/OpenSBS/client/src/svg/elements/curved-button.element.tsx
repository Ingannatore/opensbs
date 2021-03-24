import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface CurvedButtonElementModel {
    id: string | null,
    x: number,
    y: number,
    toggled: boolean,
    enabled: boolean,
    mirrored: boolean,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>, id: string | null) => void,
}

export default class CurvedButtonElement extends React.Component<CurvedButtonElementModel, {}> {
    private readonly translation: string;

    public static defaultProps = {
        id: null,
        x: 0,
        y: 0,
        toggled: false,
        enabled: true,
        mirrored: false,
    };

    constructor(props: CurvedButtonElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
               onClick={this.clickHandler}>
                <path
                    d="M -58 -70 L 40 -70 A 120 120 0 0 0 40 70 L -58 70 A 210 210 0 0 1 -58 -70"
                    fill="black" stroke="#383838" strokeWidth="2" strokeLinejoin="round"
                    transform={this.props.mirrored ? 'scale(-1 1)' : ''}
                />
                <path
                    d="M -56 -66 L 32 -66 A 124 124 0 0 0 32 66 L -56 66 A 206 206 0 0 1 -56 -66"
                    fill={!this.props.toggled ? 'none' : this.props.enabled ? 'darkturquoise' : 'darkgrey'}
                    stroke={this.props.toggled ? 'none' : this.props.enabled ? 'darkturquoise' : 'black'}
                    strokeWidth="1" strokeLinejoin="round"
                    transform={this.props.mirrored ? 'scale(-1 1)' : ''}
                />
                <text
                    x={this.props.mirrored ? 30 : -30} y="0"
                    textAnchor="middle" fontSize="3rem"
                    fill={this.props.toggled ? 'black' : this.props.enabled ? 'darkturquoise' : 'darkgrey'}
                    opacity={this.props.enabled ? 1 : 0.2}
                >{this.props.children}</text>
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGElement, MouseEvent>) {
        if (this.props.enabled) {
            this.props.onClick(event, this.props.id);
        }
    }
}
