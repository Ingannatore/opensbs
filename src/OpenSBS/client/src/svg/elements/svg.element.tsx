import * as React from 'react';

export default class SvgElement extends React.Component<{}, {}> {
    public render() {
        return (
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="shadow-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="black" stopOpacity="0" />
                        <stop offset="100%" stopColor="black" stopOpacity="0.5"/>
                    </radialGradient>
                    <radialGradient id="bevel-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="black" stopOpacity="0" />
                        <stop offset="100%" stopColor="black" stopOpacity="0.2"/>
                    </radialGradient>
                    <pattern id="BackgroundPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="10" x2="10" y2="10" stroke="#fff" strokeWidth="1"/>
                        <line x1="10" y1="0" x2="10" y2="10" stroke="#fff" strokeWidth="1"/>
                    </pattern>
                </defs>
                <symbol id="icon-navigation" width="24" height="24" viewBox="-12 -12 24 24">
                    <circle cx="0" cy="0" r="9" fill="none" stroke="#dedede" strokeWidth="2"/>
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#dedede"/>
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#dedede"/>
                    <line x1="-10" y1="-10" x2="10" y2="10" stroke="#dedede"/>
                    <line x1="10" y1="-10" x2="-10" y2="10" stroke="#dedede"/>
                </symbol>
                <symbol id="icon-ship" width="12" height="12" viewBox="-6 -6 12 12">
                    <path d="M 0 -6 L 6 6 L 0 3 L -6 6 Z" stroke="white" strokeWidth="1" fill="white"/>
                </symbol>
                {this.props.children}
                <g opacity="0">
                    <line x1="480" y1="10" x2="480" y2="1070" stroke="red"/>
                    <line x1="960" y1="10" x2="960" y2="1070" stroke="red"/>
                    <line x1="1440" y1="10" x2="1440" y2="1070" stroke="red"/>
                </g>
            </svg>
        );
    }
}
