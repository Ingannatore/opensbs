import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Dispatch} from "redux";
import ServerActions from '../../store/server/server.actions';
import DataEntryInfoModel from '../../store/server/data-entry-info.model';

interface HomePageProps extends RouteComponentProps {
    missions: DataEntryInfoModel[],
    spaceships: DataEntryInfoModel[],
    dispatch: Dispatch,
}

interface HomePageState {
    mission: string,
    spaceship: string,
    spaceshipName: string,
    spaceshipCallsign: string,
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            mission: '',
            spaceship: '',
            spaceshipName: '',
            spaceshipCallsign: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const missions = this.props.missions.map((info) => this.renderCheckbox(
            'mission',
            info,
            this.state.mission === info.guid
        ));
        const spaceships = this.props.spaceships.map((info) => this.renderCheckbox(
            'spaceship',
            info,
            this.state.spaceship === info.guid
        ));

        return (
            <form onSubmit={this.handleSubmit} className="panel">
                <div>
                    <h3>Missions</h3>
                    {missions}
                </div>
                <div>
                    <h3>Ships</h3>
                    {spaceships}
                </div>
                <div>
                    <h4>Ship Infos</h4>
                    <p>
                        <label htmlFor="spaceshipName">Name</label>
                        <input
                            type="text"
                            name="spaceshipName"
                            value={this.state.spaceshipName}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <label htmlFor="spaceshipCallsign">Callsign</label>
                        <input
                            type="text"
                            name="spaceshipCallsign"
                            value={this.state.spaceshipCallsign}
                            onChange={this.handleChange}
                        />
                    </p>
                </div>
                <div>
                    <p>
                        <input
                            type="submit"
                            value="Start Mission"
                            disabled={!this.isStateValid()}
                        />
                    </p>
                </div>
            </form>
        );
    }

    renderCheckbox(name: string, info: DataEntryInfoModel, checked: boolean) {
        return (
            <p key={name + '-' + info.guid}>
                <input
                    name={name}
                    type="radio"
                    checked={checked}
                    value={info.guid}
                    onChange={this.handleChange}
                />
                {info.name}
            </p>
        );
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        this.setState({
            ...this.state,
            [target.name]: target.value.toString()
        });
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        if (this.isStateValid()) {
            this.props.dispatch(
                ServerActions.startMission(
                    this.state.mission,
                    this.state.spaceship,
                    this.state.spaceshipName,
                    this.state.spaceshipCallsign,
                )
            );
            this.props.history.push('/station');
        }

        event.preventDefault();
    }

    private isStateValid(): boolean {
        if (!this.state.mission) return false;
        if (!this.state.spaceship) return false;
        if (!this.state.spaceshipName) return false;
        if (!this.state.spaceshipCallsign) return false;

        return true;
    }
}

const mapStateToProps = (state: any) => {
    return {
        missions: state.server.missions ?? [],
        spaceships: state.server.spaceships ?? [],
    };
};

export default withRouter(connect(mapStateToProps, null)(HomePage));
