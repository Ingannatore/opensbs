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
                    <mask id="radarMask">
                        <circle cx="0" cy="0" r="490" fill="white"/>
                    </mask>
                    <mask id="scannerMask">
                        <circle cx="0" cy="0" r="490" fill="white"/>
                    </mask>
                </defs>
                <rect x="0" y="0" width="1920" height="1080" fill="#121212"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)" opacity=".05"/>
                {this.props.children}
            </svg>
        );
    }
}
