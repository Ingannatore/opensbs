import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import ButtonElement from '../../elements/button.element';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import {EngineModuleModel} from '../../../modules/engine-module.model';

interface HelmWidgetModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    engineModule : EngineModuleModel,
}

class HelmWidget extends React.Component<HelmWidgetModel, {}> {
    private readonly translation: string;

    constructor(props: HelmWidgetModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.rotateLeft = this.rotateLeft.bind(this);
        this.stopRotation = this.stopRotation.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
    }

    public render() {
        const rudder = this.props.engineModule?.rudder ?? 0;
        return (
            <g transform={this.translation}>
                <ButtonElement
                    x={-70} y={0}
                    subtitle='rudder'
                    onClick={this.rotateLeft}
                    toggled={rudder < 0}
                >←</ButtonElement>
                <ButtonElement
                    x={0} y={0}
                    subtitle='rudder'
                    onClick={this.stopRotation}
                    toggled={rudder === 0}
                >STOP</ButtonElement>
                <ButtonElement
                    x={70} y={0}
                    subtitle='rudder'
                    onClick={this.rotateRight}
                    toggled={rudder > 0}
                >→</ButtonElement>
            </g>
        );
    }

    private rotateLeft() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setRudder',
            -1
        ));
    }

    private stopRotation() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setRudder',
            0
        ));
    }

    private rotateRight() {
        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.engineModule.id,
            'setRudder',
            +1
        ));
    }
}

const mapStateToProps = (state: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        engineModule: SpaceshipSelectors.getModuleByType(state, 'module.engine') as EngineModuleModel,
    };
};

export default connect(mapStateToProps)(HelmWidget);
