import * as React from 'react';
import Button from "../../elements/button";
import Container from "../../elements/container";
import Actions from "../../store/actions";
import {connect} from "react-redux";
import Selectors from "../../store/selectors";
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
        return (
            <Container size={210} x={this.props.x} y={this.props.y}>
                <Button x={-100} y={0} size={30} onClick={this.turnLeft}>-</Button>
                <Button x={0} y={0} size={30} onClick={this.reset}>0</Button>
                <Button x={100} y={0} size={30} onClick={this.turnRight}>+</Button>
                <Text x={0} y={50} size={2} fill="#ffffff">{this.props.module ? this.props.module.rudder : 0}</Text>
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
