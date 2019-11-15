﻿import * as React from 'react';

export default class Svg extends React.Component<{}, {}> {
    public render() {
        return (
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
                {this.props.children}
            </svg>
        );
    }
}
