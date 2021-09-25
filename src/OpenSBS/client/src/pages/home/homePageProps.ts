import {Dispatch} from 'redux';
import {RouteComponentProps} from 'react-router-dom';
import DataEntryInfo from '../../models/dataEntryInfo';

export default interface HomePageProps extends RouteComponentProps {
    isReady: boolean,
    missions: DataEntryInfo[],
    spaceships: DataEntryInfo[],
    dispatch: Dispatch,
}
