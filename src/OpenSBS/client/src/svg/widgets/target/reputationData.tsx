import * as React from 'react';
import Naming from '../../../lib/naming';
import DataRow from '../../elements/dataRow';

interface ReputationDataProps {
    x: number,
    y: number,
    reputation: number | null,
}

export default class ReputationData extends React.Component<ReputationDataProps, {}> {
    public render() {
        return (
            <DataRow x={this.props.x} y={this.props.y} label="Reputation">
                {Naming.getReputationName(this.props.reputation)}
            </DataRow>
        );
    }
}
