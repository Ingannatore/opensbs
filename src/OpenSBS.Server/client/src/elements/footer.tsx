import * as React from 'react';

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <g transform="translate(0, 1040)">
                <line x1="0" y1="0" x2="1920" y2="0" stroke="#36424a" strokeWidth="1"/>
                <rect x="0" y="0" width="1920" height="40" fill="#070d0f" stroke="none"/>
                {this.props.children}
            </g>
        );
    }
}
