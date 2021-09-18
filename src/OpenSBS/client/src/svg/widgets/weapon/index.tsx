import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';
import ClientSelectors from '../../../store/client/client.selectors';
import EntityTraceModel from '../../../modules/entity-trace.model';
import WeaponModuleModel from '../../../modules/weapon-module.model';
import ValueElement from '../../elements/value.element';
import CylinderElement from '../../elements/cylinder.element';
import SwitchElement from '../../elements/switch.element';
import WeaponNameElement from './weapon-name.element';
import ColorPalette from '../../color-palette';

interface WeaponProps {
    x: number,
    y: number,
    index: number,
    dispatch: any,
    entityId: string,
    selectedTarget: EntityTraceModel | null,
    weapon: WeaponModuleModel | undefined,
    weaponTarget: EntityTraceModel | undefined,
}

class WeaponWidget extends React.Component<WeaponProps, {}> {
    private readonly translation: string;

    constructor(props: WeaponProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onEngage = this.onEngage.bind(this);
    }

    public render() {
        if (!this.props.weapon) {
            return null;
        }

        return (
            <g transform={this.translation} key={`weapon-${this.props.weapon.id}`}>
                <g transform="translate(10 10)">
                    <SwitchElement
                        x={0} y={0}
                        width={90} height={40}
                        fontSize={1.5} color={ColorPalette.WARNING}
                        onClick={this.onEngage}
                        enabled={this.props.weapon.target != null || this.props.selectedTarget != null}
                        toggled={!!this.props.weapon.target}
                    >ENGAGE</SwitchElement>
                    <ValueElement
                        x={45} y={130}
                        label="target"
                    >{this.props.weaponTarget?.callSign || '-'}</ValueElement>
                </g>
                <g transform="translate(10 175)">
                    <CylinderElement
                        x={20} y={0}
                        height={280} ratio={this.props.weapon.timer.ratio}
                    />
                </g>
                <WeaponNameElement x={55} y={595}>{this.props.weapon.name}</WeaponNameElement>
            </g>
        );
    }

    private onEngage() {
        if (!this.props.weapon) {
            return;
        }

        if (this.props.weapon.target) {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.weapon.id,
                'disengage',
                null
            ));

            return;
        }

        if (this.props.selectedTarget) {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.weapon.id,
                'engage',
                this.props.selectedTarget.id
            ));
        }
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    const weapon = SpaceshipSelectors.getWeapon(state, ownProps.index);

    return {
        selectedTarget: ClientSelectors.getSelectedTarget(state),
        entityId: SpaceshipSelectors.getId(state),
        weapon: weapon,
        weaponTarget: weapon?.target ? SpaceshipSelectors.getTrace(state, weapon.target) : undefined,
    };
};

export default connect(mapStateToProps)(WeaponWidget);
