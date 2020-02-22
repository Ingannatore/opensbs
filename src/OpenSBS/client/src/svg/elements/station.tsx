import * as React from 'react';

interface StationProps {
    name: string,
    icon: string,
}

export default class Station extends React.Component<StationProps, {}> {
    public static defaultProps = {
        name: '',
        icon: '',
    };

    render() {
        return (
            <g>
                <defs>
                    <pattern id="BackgroundPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="10" x2="10" y2="10" stroke="#fff" strokeWidth="1"/>
                        <line x1="10" y1="0" x2="10" y2="10" stroke="#fff" strokeWidth="1"/>
                    </pattern>
                    <g id="header">
                        <path
                            d="M -1 -1 L -1 60 L 420 60 L 460 20 L 1460 20 L 1500 60 L 1921 60 L 1921 -1 Z"
                            stroke="none" fill="#020202"
                        />
                        <path
                            d="M -1 60 L 420 60 L 460 20 L 1460 20 L 1500 60 L 1921 60"
                            stroke="#383838" fill="none"
                        />
                    </g>
                    <path id="icon-ship" d="M 0 -6 L 6 6 L 0 3 L -6 6 Z" stroke="white" strokeWidth="1" fill="white"/>
                    <g id="icon-navigation">
                        <circle cx="0" cy="0" r="9" fill="none" stroke="#dedede" strokeWidth="2"/>
                        <line x1="0" y1="-12" x2="0" y2="12" stroke="#dedede"/>
                        <line x1="-12" y1="0" x2="12" y2="0" stroke="#dedede"/>
                        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#dedede"/>
                        <line x1="10" y1="-10" x2="-10" y2="10" stroke="#dedede"/>
                    </g>
                </defs>
                <rect x="0" y="0" width="1920" height="1080" fill="#121212"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)" opacity=".05"/>

                <g>
                    <use href="#header"/>
                    {this.props.icon && (
                        <use href={this.props.icon} x="20" y="20" transform="scale(1.5)"/>
                    )}
                    {this.props.name && (
                        <text x="70" y="30" fontSize="2rem" fill="#dedede">{this.props.name}</text>
                    )}
                </g>

                {this.props.children}

                <g transform="translate(0 1080)">
                    <use href="#header" transform="scale(1 -1)"/>
                    <g transform="translate(10 0)">
                        <text x="0" y="-40" fontSize="1rem" fill="#999999">
                            Terran Federation
                        </text>
                        <text x="0" y="-20" fontSize="1rem" fill="#999999">
                            Omega-class Cruiser
                        </text>
                        <text x="400" y="-30" fontSize="2rem" fill="#dedede" textAnchor="end">
                            Archimedes
                        </text>
                    </g>

                    <g transform="translate(1910 0)">
                        <text x="-400" y="-30" fontSize="2rem" fill="#dedede">
                            Raphael Legatus
                        </text>
                        <text x="0" y="-40" fontSize="1rem" fill="#999999" textAnchor="end">
                            Lieutenant
                        </text>
                        <text x="0" y="-20" fontSize="1rem" fill="#999999" textAnchor="end">
                            #32TK3IR1
                        </text>
                    </g>
                </g>
            </g>
        );
    }
}
