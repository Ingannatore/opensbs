import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';

interface RudderLockElementModel {
    id: string | null,
    x: number,
    y: number,
    toggled: boolean,
    enabled: boolean,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>, id: string | null) => void,
}

export default class RudderLockElement extends React.Component<RudderLockElementModel, {}> {
    private readonly translation: string;

    public static defaultProps = {
        id: null,
        x: 0,
        y: 0,
        toggled: false,
        enabled: true,
    };

    constructor(props: RudderLockElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
               onClick={this.clickHandler}>
                <path
                    d="M -148 -30 L 148 -30 A 210 210 0 0 1 190 30 L -190 30 A 210 210 0 0 1 -148 -30"
                    fill="black" stroke="#383838" strokeWidth="2" strokeLinejoin="round"
                />
                <path
                    d="M -146 -26 L 146 -26 A 206 206 0 0 1 184 26 L -184 26 A 206 206 0 0 1 -146 -26"
                    fill={!this.props.toggled ? 'none' : this.props.enabled ? 'darkorange' : 'darkgrey'}
                    stroke={this.props.toggled ? 'none' : this.props.enabled ? 'darkorange' : 'black'}
                    strokeWidth="1" strokeLinejoin="round"
                />
                <text
                    x="0" y="0"
                    textAnchor="middle" fontSize="1.5rem"
                    fill={this.props.toggled ? 'black' : this.props.enabled ? 'darkorange' : 'darkgrey'}
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
