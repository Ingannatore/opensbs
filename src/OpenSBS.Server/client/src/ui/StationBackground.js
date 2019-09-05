import React, {Component} from 'react';

class StationBackground extends Component {
    render() {
        return (
            <g id="StationBackground">
                <rect x="0" y="0" width="1920" height="1080" fill="#0b1519"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)"/>
            </g>
        );
    }
}

export default StationBackground;
