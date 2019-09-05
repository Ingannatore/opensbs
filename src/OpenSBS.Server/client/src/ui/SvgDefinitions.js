import React, {Component} from 'react';

class SvgDefinitions extends Component {
    render() {
        return (
            <defs>
                <pattern id="BackgroundPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="9" y="9" width="4" height="4" className="fill-dark-blue"/>
                    <rect x="10" y="10" width="2" height="2" className="fill-light-blue"/>
                </pattern>
            </defs>
        );
    }
}

export default SvgDefinitions;
