import * as React from 'react';
import JoinPropsModel from './join-props.model';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class JoinPage extends React.Component<JoinPropsModel, {}> {
    constructor(props: JoinPropsModel) {
        super(props);

        this.handleSelectTerminal = this.handleSelectTerminal.bind(this);
    }

    public render() {
        return (
            <div className="panel">
                <h3>Terminals</h3>
                <p>
                    <button onClick={() => this.handleSelectTerminal('navigation')}>Navigation</button>
                </p>
                <p>
                    <button onClick={() => this.handleSelectTerminal('tactical')}>Tactical</button>
                </p>
            </div>
        );
    }

    private handleSelectTerminal(name: string) {
        this.props.history.push('/terminal/' + name);
    }
}

export default withRouter(connect(null, null)(JoinPage));
