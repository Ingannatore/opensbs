import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import Actions from '../store/actions/system';

interface HomePageProps extends RouteComponentProps {
    dispatch: Dispatch,
}

class Home extends React.Component<HomePageProps, {}> {
    constructor(props: HomePageProps) {
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

export default withRouter(connect(null, null)(Home));
