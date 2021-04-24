import {Dispatch} from 'redux';
import {RouteComponentProps} from 'react-router-dom';
import DataEntryInfoModel from '../../models/data-entry-info.model';

export default interface HomePropsModel extends RouteComponentProps {
    isReady: boolean,
    missions: DataEntryInfoModel[],
    spaceships: DataEntryInfoModel[],
    dispatch: Dispatch,
}
