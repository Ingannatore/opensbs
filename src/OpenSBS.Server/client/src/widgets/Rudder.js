import React, {Component} from 'react';
import {connect} from 'react-redux'
import Actions from '../actions'

class Rudder extends Component {
    constructor(props) {
        super(props);

        this.sxButtonClick = this.sxButtonClick.bind(this);
        this.resetButtonClick = this.resetButtonClick.bind(this);
        this.dxButtonClick = this.dxButtonClick.bind(this);
    }

    render() {
        return (
            <div id="Rudder" className="box">
                <h2>Rudder</h2>
                <h3>{this.props.rudder}</h3>
                <p>value</p>
                <p>
                    <button onClick={this.sxButtonClick}>- SX -</button>
                    <button onClick={this.resetButtonClick}>- 0 -</button>
                    <button onClick={this.dxButtonClick}>- DX -</button>
                </p>
            </div>
        );
    }

    sxButtonClick() {
        this.props.dispatch(Actions.setState('ship.rudder', -5))
    }

    resetButtonClick() {
        this.props.dispatch(Actions.setState('ship.rudder', 0))
    }

    dxButtonClick() {
        this.props.dispatch(Actions.setState('ship.rudder', +5))
    }
}

const mapStateToProps = state => {
    return {
        rudder: state['ship.rudder']
    }
};

export default connect(mapStateToProps)(Rudder);
