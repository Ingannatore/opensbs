import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import ServerActions from '../store/actions/server';

interface HomePageProps extends RouteComponentProps {
    missions: any[],
    dispatch: Dispatch,
}

class Home extends React.Component<HomePageProps, {}> {
    constructor(props: HomePageProps) {
        super(props);

        this.loadButtonHandler = this.loadButtonHandler.bind(this);
        this.startButtonHandler = this.startButtonHandler.bind(this);
    }

    render() {
        const missionsButtons = this.props.missions.map((mission) => this.renderMissionButton(mission));

        return (
            <div>
                <p><button onClick={this.loadButtonHandler}>Load Missions</button></p>
                <ul>{missionsButtons}</ul>
            </div>
        );
    }

    renderMissionButton(mission: any) {
        return (
                <li key={`mission-${mission.guid}`}>
                    <button
                        id={mission.guid}
                        onClick={() => this.startButtonHandler(mission.guid)}
                    >{mission.title}</button>
                </li>
        );
    }

    loadButtonHandler() {
        this.props.dispatch(ServerActions.getMissions());
    }

    startButtonHandler(id: string) {
        this.props.dispatch(ServerActions.startMission(id));
        this.props.history.push('/station');
    }
}

const mapStateToProps = (state: any) => {
    return {
        missions: state.server.missions
    };
};

export default withRouter(connect(mapStateToProps, null)(Home));
