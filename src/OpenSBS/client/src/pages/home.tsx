import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import ServerActions from '../store/actions/server';

interface HomePageProps extends RouteComponentProps {
    scenarios: any[],
    dispatch: Dispatch,
}

class Home extends React.Component<HomePageProps, {}> {
    constructor(props: HomePageProps) {
        super(props);

        this.loadButtonHandler = this.loadButtonHandler.bind(this);
        this.startButtonHandler = this.startButtonHandler.bind(this);
    }

    render() {
        const scenarioButtons = this.props.scenarios.map((scenario) => this.renderScenarioButton(scenario));

        return (
            <div>
                <p><button onClick={this.loadButtonHandler}>Load Scenarios</button></p>
                <ul>{scenarioButtons}</ul>
            </div>
        );
    }

    renderScenarioButton(scenario: any) {
        return (
                <li>
                    <button
                        id={scenario.guid}
                        onClick={() => this.startButtonHandler(scenario.guid)}
                    >{scenario.title}</button>
                </li>
        );
    }

    loadButtonHandler() {
        this.props.dispatch(ServerActions.getScenarios());
    }

    startButtonHandler(id: string) {
        this.props.dispatch(ServerActions.startScenario(id));
        this.props.history.push('/station');
    }
}

const mapStateToProps = (state: any) => {
    return {
        scenarios: state.server.scenarios
    };
};

export default withRouter(connect(mapStateToProps, null)(Home));
