﻿import * as React from 'react';
import {connect} from 'react-redux';
import ShipActions from '../../store/actions/ship';
import ShipSelectors from '../../store/selectors/ship';
import SvgTransforms from '../../lib/svg-transforms';
import Button from '../../elements/button';
import Container from '../../elements/container';
import Bezel from '../../elements/bezel';
import Display from '../../elements/display';
import Arc from '../../elements/arc';
import Text from '../../elements/text';

interface HelmComponentProps {
    dispatch: any,
    x: number,
    y: number,
    shipId: string,
    module: any
}

class Helm extends React.Component<HelmComponentProps> {
    constructor(props: HelmComponentProps) {
        super(props);

        this.turnLeftHandler = this.turnLeftHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.turnRightHandler = this.turnRightHandler.bind(this);
    }

    render() {
        const rudderValue = this.props.module ? this.props.module.rudder : 0;
        let subtitle: string;
        switch (Math.sign(rudderValue)) {
            case -1:
                subtitle = 'port';
                break;
            case 1:
                subtitle = 'starboard';
                break;
            default:
                subtitle = 'stop';
        }

        const rotation = SvgTransforms.rotate(rudderValue * 30);
        return (
            <Container size={200} x={this.props.x} y={this.props.y}>
                <Bezel
                    size={140} rotation={0}
                    fromAngle={-120} toAngle={120}
                    stroke={'none'} labels={"40 30 20 10 0 10 20 30 40"}
                />
                <Arc size={140} fromAngle={-210} toAngle={30}/>

                <line
                    x1="0" y1="-186"
                    x2="0" y2="-195"
                    stroke="#c9c571" strokeWidth="2"
                    transform={rotation}
                />
                <line
                    x1="0" y1="-121"
                    x2="0" y2="-134"
                    stroke="#c9c571" strokeWidth="2"
                    transform={rotation}
                />
                <line
                    x1="0" y1="121"
                    x2="0" y2="196"
                    stroke="#2a363c" strokeWidth="1"
                />
                <Text x={-20} y={150} size={1.75} fill={'#aaadae'} textAnchor={'end'}>{'port'}</Text>
                <Text x={20} y={150} size={1.75} fill={'#aaadae'} textAnchor={'start'}>{'stbd'}</Text>

                <Display size={120} title="rudder" subtitle={subtitle}>
                    {Math.abs(rudderValue)}
                </Display>
                <Button x={-170} y={-170} size={30} fontSize={2} onClick={this.turnLeftHandler}>←</Button>
                <Button x={170} y={170} size={30} onClick={this.resetHandler}>STOP</Button>
                <Button x={170} y={-170} size={30} fontSize={2} onClick={this.turnRightHandler}>→</Button>
            </Container>
        );
    }

    private turnLeftHandler() {
        this.props.dispatch(ShipActions.sendModuleMessage(
            this.props.shipId,
            this.props.module.id,
            'set',
            -1
        ));
    }

    private resetHandler() {
        this.props.dispatch(ShipActions.sendModuleMessage(
            this.props.shipId,
            this.props.module.id,
            'set',
            0
        ));
    }

    private turnRightHandler() {
        this.props.dispatch(ShipActions.sendModuleMessage(
            this.props.shipId,
            this.props.module.id,
            'set',
            1
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        'shipId': ShipSelectors.selectShipId(state),
        'module': ShipSelectors.selectModulesByType('engine.manoeuvre', state)[0]
    };
};

export default connect(mapStateToProps)(Helm);