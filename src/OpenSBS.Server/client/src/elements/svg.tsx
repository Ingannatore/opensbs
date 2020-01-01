import * as React from 'react';

export default class Svg extends React.Component<{}, {}> {
    public render() {
        return (
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <g id="icon-dummy">
                        <circle
                            cx="0" y="0" r="6"
                            stroke="white" strokeWidth="2" fill="#474747"
                        />
                        <circle
                            cx="0" y="0" r="1"
                            stroke="none" fill="white"
                        />
                    </g>
                    <path
                        id="icon-ship"
                        d="M 0 -6 L 6 6 L 0 3 L -6 6 Z"
                        stroke="white" strokeWidth="1" fill="white"
                    />
                    <rect
                        id="icon-station"
                        x="-6" y="-6" width="12" height="12"
                        stroke="white" strokeWidth="2" fill="#474747"
                    />
                </defs>
                {this.props.children}
            </svg>
        );
    }
}
