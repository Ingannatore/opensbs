import * as React from 'react';
import {connect} from 'react-redux';
import SpaceshipActions from '../../store/spaceship/spaceship.actions';
import SpaceshipSelectors from '../../store/spaceship/spaceship.selectors';
import SvgTransforms from '../../lib/svg-transforms';
import RoundButton from '../elements/roundButton';
import PillButton from '../elements/pillButton';

interface HelmProps {
    dispatch: any,
    x: number,
    y: number,
    shipId: string,
    module: any,
}

class Helm extends React.Component<HelmProps> {
    private readonly translation: string;

    constructor(props: HelmProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.turnLeftHandler = this.turnLeftHandler.bind(this);
        this.stopHandler = this.stopHandler.bind(this);
        this.turnRightHandler = this.turnRightHandler.bind(this);
    }

    render() {
        const direction = Math.sign(this.getRudderValue());
        return (
            <g transform={this.translation}>
                <PillButton
                    x={-120} y={0} width={80}
                    fontSize={'3rem'}
                    toggled={direction < 0}
                    onClick={this.turnLeftHandler}
                >&lt;</PillButton>
                <RoundButton onClick={this.stopHandler}>stop</RoundButton>
                <PillButton
                    x={120} y={0} width={80}
                    fontSize={'3rem'}
                    toggled={direction > 0}
                    onClick={this.turnRightHandler}
                >&gt;</PillButton>
            </g>
        );
    }

    private getRudderValue(): number {
        return this.props.module ? this.props.module.rudder : 0;
    }

    private turnLeftHandler() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.shipId,
            this.props.module.id,
            'set',
            '-1'
        ));
    }

    private stopHandler() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.shipId,
            this.props.module.id,
            'set',
            '0'
        ));
    }

    private turnRightHandler() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.shipId,
            this.props.module.id,
            'set',
            '1'
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        shipId: SpaceshipSelectors.getId(state),
        module: SpaceshipSelectors.getModuleByType(state, 'module.engine')
    };
};

export default connect(mapStateToProps)(Helm);
