import * as React from 'react';
import {Navigate} from 'react-router-dom';

interface JoinPageState {
    selectedTerminal: string | null,
}

export default class JoinPage extends React.Component<{}, JoinPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTerminal: null,
        };

        this.selectTerminal = this.selectTerminal.bind(this);
    }

    public render() {
        if (this.state.selectedTerminal) {
            return (
                <Navigate to={'/terminal/' + this.state.selectedTerminal} replace={true} />
            )
        }

        return (
            <div className="panel">
                <h3>Terminals</h3>
                <p>
                    <button onClick={() => this.selectTerminal('navigation')}>Navigation</button>
                </p>
                <p>
                    <button onClick={() => this.selectTerminal('tactical')}>Tactical</button>
                </p>
                <p>
                    <button onClick={() => this.selectTerminal('intelligence')}>Intelligence</button>
                </p>
                <p>
                    <button onClick={() => this.selectTerminal('cartography')}>Cartography</button>
                </p>
            </div>
        );
    }

    private selectTerminal(code: string) {
        this.setState({
            ...this.state,
            selectedTerminal: code,
        });
    }
}
