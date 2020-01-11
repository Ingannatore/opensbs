import * as React from 'react';

export default class Station extends React.Component<{}, {}> {
    render() {
        return (
            <g>
                <defs>
                    <pattern id="BackgroundPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="20" x2="20" y2="20" stroke="#122127" strokeWidth="1"/>
                        <line x1="20" y1="0" x2="20" y2="20" stroke="#122127" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect x="0" y="0" width="1920" height="1080" fill="#0b1519"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)" opacity="1"/>

                {/*
                <line x1="20" y1="20" x2="20" y2="1020" stroke="red"/>
                <line x1="460" y1="20" x2="460" y2="1020" stroke="red"/>
                <line x1="960" y1="20" x2="960" y2="1020" stroke="red"/>
                <line x1="1460" y1="20" x2="1460" y2="1020" stroke="red"/>
                <line x1="1900" y1="20" x2="1900" y2="1020" stroke="red"/>
                <line x1="20" y1="520" x2="1900" y2="520" stroke="red"/>
                */}

                {this.props.children}
            </g>
        );
    }
}
