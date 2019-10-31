import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Actions from '../actions/system';

class Home extends Component {
    constructor(props) {
        super(props);

        this.startButtonHandler = this.startButtonHandler.bind(this);
    }

    render() {
        return (
            <div>
                <button onClick={this.startButtonHandler}>START!</button>
            </div>
        );
    }

    startButtonHandler() {
        this.props.dispatch(Actions.startScenario());
        this.props.history.push('/station');
    }
}

const mapStateToProps = state => {
    return {};
};

export default withRouter(connect(mapStateToProps)(Home));
