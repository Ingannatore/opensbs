import * as React from 'react';

interface StationElementModel {
    name: string,
    icon: string,
}

export default class StationElement extends React.Component<StationElementModel, {}> {
    public static defaultProps = {
        name: '',
        icon: '',
    };

    render() {
        return (
            <g>
                <rect x="0" y="0" width="1920" height="1080" fill="#121212"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)" opacity=".05"/>

                <g>
                    {this.props.icon && (
                        <use href={this.props.icon} x="8" y="8" transform="scale(1.5)"/>
                    )}
                    {this.props.name && (
                        <text x="60" y="30" fontSize="2rem" fill="#dedede">{this.props.name}</text>
                    )}
                    <path
                        d="M 0 60 L 460 60 L 500 20 L 1420 20 L 1460 60 L 1920 60"
                        stroke="darkgrey" strokeWidth="2" fill="none" shapeRendering="crispEdges"
                    />
                    <g transform="translate(0 1080)">
                        <path
                            d="M 0 60 L 460 60 L 500 20 L 1420 20 L 1460 60 L 1920 60"
                            stroke="darkgrey" strokeWidth="2" fill="none" shapeRendering="crispEdges"
                            transform="scale(1,-1)"
                        />
                    </g>
                </g>

                {this.props.children}
            </g>
        );
    }
}
