import * as React from 'react';

export default class SvgRoot extends React.Component<{}, {}> {
    public render() {
        return (
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <symbol id="header">
                    <path
                        d="M -1 -1 L -1 60 L 420 60 L 460 20 L 1460 20 L 1500 60 L 1921 60 L 1921 -1 Z"
                        stroke="none" fill="#020202"
                    />
                    <path
                        d="M -1 60 L 420 60 L 460 20 L 1460 20 L 1500 60 L 1921 60"
                        stroke="#383838" fill="none"
                    />
                </symbol>
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
            </svg>
        );
    }
}
