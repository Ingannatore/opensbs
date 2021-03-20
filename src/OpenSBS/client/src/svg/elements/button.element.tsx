import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface ButtonElementModel {
    id: string | null,
    x: number,
    y: number,
    subtitle: string,
    toggled: boolean,
    enabled: boolean,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>, id: string | null) => void,
}

export default class ButtonElement extends React.Component<ButtonElementModel, {}> {
    private readonly translation: string;

    public static defaultProps = {
        id: null,
        x: 0,
        y: 0,
        subtitle: '',
        toggled: false,
        enabled: true,
    };

    constructor(props: ButtonElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor={this.props.enabled ? 'pointer' : 'not-allowed'} onClick={this.clickHandler}>
                <rect
                    x="-30" y="-30"
                    width="60" height="60"
                    fill="#2d2f2f" stroke="none"
                    opacity={this.props.enabled ? 0.4 : 0}
                />
                <rect
                    x="-30" y="-30"
                    width="60" height="60"
                    stroke="#6f6971" strokeWidth="1"
                    fill="none"
                />
                <rect
                    x="-30" y="-30"
                    width="60" height="60"
                    fill="url('#shadow-gradient')" stroke="none"
                />
                <text
                    x="0" y="-10"
                    textAnchor="middle" fontSize="1.5rem"
                    fill={this.props.toggled ? 'darkturquoise' : 'darkgray'}
                    opacity={this.props.enabled ? 1 : 0.2}
                >{this.props.children}</text>
                {this.props.subtitle && <text
                    x="0" y="15"
                    textAnchor="middle" fontSize=".75rem"
                    fill={this.props.toggled ? 'darkturquoise' : 'darkgray'}
                    opacity={this.props.enabled ? 1 : 0.2}
                >{this.props.subtitle}</text>}
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGElement, MouseEvent>) {
        if (this.props.enabled) {
            this.props.onClick(event, this.props.id);
        }
    }
}
