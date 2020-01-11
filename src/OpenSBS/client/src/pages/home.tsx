import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import ServerActions from '../store/actions/server';

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
        this.props.dispatch(ServerActions.startScenario());
        this.props.history.push('/station');
    }
}

export default withRouter(connect(null, null)(Home));
