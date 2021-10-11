import * as React from 'react';

export default class SvgElement extends React.Component<{}, {}> {
    public render() {
        return (
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="BackgroundPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="10" x2="10" y2="10" stroke="#fff" strokeWidth="1"/>
                        <line x1="10" y1="0" x2="10" y2="10" stroke="#fff" strokeWidth="1"/>
                    </pattern>
                    <mask id="mapMask">
                        <rect x="-495" y="-495" width="990" height="990" fill="white"/>
                    </mask>
                    <mask id="gridMask">
                        <rect x="-495" y="-495" width="990" height="990" fill="white"/>
                    </mask>
                </defs>
                <rect x="0" y="0" width="1920" height="1080" fill="#121212"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)" opacity=".05"/>
                {this.props.children}
                <g opacity="0">
                    <line x1="220" y1="10" x2="220" y2="1070" stroke="orange"/>
                    <line x1="440" y1="10" x2="440" y2="1070" stroke="red"/>
                    <line x1="460" y1="10" x2="460" y2="1070" stroke="red"/>
                    <line x1="960" y1="10" x2="960" y2="1070" stroke="orange"/>
                    <line x1="1460" y1="10" x2="1460" y2="1070" stroke="red"/>
                    <line x1="1480" y1="10" x2="1480" y2="1070" stroke="red"/>
                    <line x1="1700" y1="10" x2="1700" y2="1070" stroke="orange"/>

                    <line x1="10" y1="80" x2="1910" y2="80" stroke="red"/>
                    <line x1="10" y1="380" x2="1910" y2="380" stroke="red"/>
                    <line x1="10" y1="390" x2="1910" y2="390" stroke="red"/>
                    <line x1="10" y1="540" x2="1910" y2="540" stroke="orange"/>
                    <line x1="10" y1="690" x2="1910" y2="690" stroke="red"/>
                    <line x1="10" y1="700" x2="1910" y2="700" stroke="red"/>
                    <line x1="10" y1="850" x2="1910" y2="850" stroke="orange"/>
                    <line x1="10" y1="1000" x2="1910" y2="1000" stroke="red"/>
                </g>
            </svg>
        );
    }
}
