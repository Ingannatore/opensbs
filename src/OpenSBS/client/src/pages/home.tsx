import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import ServerActions from '../store/server/server.actions';
import DataEntryInfoModel from '../store/server/data-entry-info.model';

interface HomePageProps extends RouteComponentProps {
    missions: DataEntryInfoModel[],
    dispatch: Dispatch,
}

class Home extends React.Component<HomePageProps, {}> {
    constructor(props: HomePageProps) {
        super(props);

        this.startButtonHandler = this.startButtonHandler.bind(this);
    }

    render() {
        const missionsButtons = this.props.missions.map((mission) => this.renderMissionButton(mission));

        return (
            <div>
                <ul>{missionsButtons}</ul>
            </div>
        );
    }

    renderMissionButton(mission: DataEntryInfoModel) {
        return (
                <li key={`mission-${mission.guid}`}>
                    <button
                        id={mission.guid}
                        onClick={() => this.startButtonHandler(mission.guid)}
                    >{mission.name}</button>
                </li>
        );
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
