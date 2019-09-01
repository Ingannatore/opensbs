import React, {Component} from 'react';
import {connect} from 'react-redux'
import Compass from './widgets/Compass'
import Rudder from './widgets/Rudder'

class App extends Component {
    render() {
        return (
            <div>
                <Rudder />
                <svg width="1920" height="1080" viewBox="0 0 1920 1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="BackgroundPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="9" y="9" width="4" height="4" className="fill-dark-blue"/>
                            <rect x="10" y="10" width="2" height="2" className="fill-light-blue"/>
                        </pattern>
                    </defs>
                    <g id="StationBackground">
                        <rect x="0" y="0" width="1920" height="1080" fill="#0b1519"/>
                        <rect x="0" y="0" width="1920" height="1080" fill="url(#BackgroundPattern)"/>
                    </g>
                    <Compass x="240" y="240"/>
                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        valueA: state.valueA,
        valueB: state.valueB
    }
};

export default connect(mapStateToProps)(App);
