import * as React from 'react';
import Button from "../../elements/button";
import Container from "../../elements/container";
import Actions from "../../store/actions";
import {connect} from "react-redux";
import Selectors from "../../store/selectors";
import Bezel from "../../elements/bezel";
import Display from "../../elements/display";
import Arc from "../../elements/arc";
import Text from "../../elements/text";

interface HelmComponentProps {
    dispatch: any,
    x: number,
    y: number,
    module: any
}

class Helm extends React.Component<HelmComponentProps> {
    constructor(props: HelmComponentProps) {
        super(props);

        this.turnLeft = this.turnLeft.bind(this);
        this.reset = this.reset.bind(this);
        this.turnRight = this.turnRight.bind(this);
    }

    render() {
        const rudderValue = this.props.module ? this.props.module.rudder : 0;
        let subtitle = '';
        switch (Math.sign(rudderValue)) {
            case -1:
                subtitle = 'port';
                break;
            case 1:
                subtitle = 'starboard';
                break;
            default: subtitle = 'stop';
        }

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
                    transform={`rotate(${rudderValue * 30}, 0, 0)`}
                />
                <line
                    x1="0" y1="-121"
                    x2="0" y2="-134"
                    stroke="#c9c571" strokeWidth="2"
                    transform={`rotate(${rudderValue * 30}, 0, 0)`}
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
                <Button x={-170} y={-170} size={30} fontSize={2} onClick={this.turnLeft}>←</Button>
                <Button x={170} y={170} size={30} onClick={this.reset}>STOP</Button>
                <Button x={170} y={-170} size={30} fontSize={2} onClick={this.turnRight}>→</Button>
            </Container>
        );
    }

    private turnLeft() {
        this.props.dispatch(Actions.sendModuleMessage(this.props.module.id, -1))
    }

    private reset() {
        this.props.dispatch(Actions.sendModuleMessage(this.props.module.id, 0))
    }

    private turnRight() {
        this.props.dispatch(Actions.sendModuleMessage(this.props.module.id, 1))
    }
}

const mapStateToProps = (state: any) => {
    return {
        'module': Selectors.selectModulesByType('engine.manoeuvre', state)[0]
    };
};

export default connect(mapStateToProps)(Helm);
