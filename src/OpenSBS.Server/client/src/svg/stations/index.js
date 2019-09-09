import React, {Component} from 'react'

class Station extends Component {
    render() {
        return (
            <g id={'station' + this.props.id}>
                <defs>
                    <pattern id="BackgroundPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="9" y="9" width="4" height="4" className="fill-dark-blue"/>
                        <rect x="10" y="10" width="2" height="2" className="fill-light-blue"/>
                    </pattern>
                </defs>
                <rect x="0" y="0" width="1920" height="1080" fill="#0b1519"/>
                <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)"/>
                {this.props.children}
            </g>
        );
    }
}

export default Station;
