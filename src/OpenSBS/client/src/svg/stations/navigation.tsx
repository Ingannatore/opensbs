import * as React from 'react';
import {AlertLevels} from '../../models/alertLevels';
import Station from '../elements/station';
import BearingDisplay from '../widgets/bearingDisplay';
import Helm from '../widgets/helm';
import ImpulseEngine from '../widgets/impulseEngine';
import WarpDrive from '../widgets/warpDrive';
import AlertDisplay from '../widgets/alertDisplay';
import Radar from '../widgets/radar';

export default class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <Station name="Navigation" icon="#icon-navigation">
                <BearingDisplay x={540} y={120}/>
                <AlertDisplay x={1380} y={120} level={AlertLevels.Normal}/>
                <Radar x={960} y={540}/>
                <ImpulseEngine x={1710} y={270}/>
                <Helm x={1710} y={540}/>
                <WarpDrive x={1710} y={810}/>
            </Station>
        );
    }
}
