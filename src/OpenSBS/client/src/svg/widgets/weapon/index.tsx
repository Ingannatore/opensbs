import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';
import ClientSelectors from '../../../store/client/client.selectors';
import WeaponModuleModel from '../../../modules/weapon-module.model';
import PanelElement from '../../elements/panel.element';
import GaugeElement from '../../elements/gauge.element';
import SwitchElement from '../../elements/switch.element';
import ValueElement from '../../elements/value.element';
import ColorPalette from '../../color-palette';

class WeaponWidget extends React.Component<WeaponProps, {}> {
    private readonly translation: string;

    constructor(props: WeaponProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.fire = this.fire.bind(this);
    }

    public render() {
        if (!this.props.weapon) {
            return null;
        }

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={150}>
                <text
                    x="230" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.weapon.name.toUpperCase()}</text>
                <ValueElement
                    x={230} y={60}
                    label="target"
                >{this.props.weapon.target ? this.props.weapon.target : '-'}</ValueElement>
                <ValueElement
                    x={230} y={120}
                    label="ammo"
                >Argon</ValueElement>

                <g transform="translate(80 90)">
                    <GaugeElement
                        x={0} y={0}
                        ratio={this.props.weapon.counter.ratio}
                    />
                    <SwitchElement
                        x={-30} y={-30} rx={30}
                        width={60} height={60}
                        fontSize={1}
                        color={ColorPalette.WARNING}
                        onClick={this.fire}
                        enabled={this.props.weapon.target != null || this.props.target != null}
                        toggled={!!this.props.weapon.target}
                    >FIRE</SwitchElement>
                </g>

                <g transform="translate(380 90)">
                    <GaugeElement x={0} y={0} ratio={0}/>
                    <SwitchElement
                        x={-30} y={-30} rx={30}
                        width={60} height={60}
                        fontSize={1}
                        onClick={this.fire}
                    >RELOAD</SwitchElement>
                </g>

            </PanelElement>
        );
    }

    private fire() {
        if (!this.props.weapon) {
            return;
        }

        if (this.props.weapon.isEngaged) {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.weapon.id,
                'disengage',
                null
            ));

            return;
        }

        if (this.props.target) {
            this.props.dispatch(SpaceshipActions.sendModuleAction(
                this.props.entityId,
                this.props.weapon.id,
                'engage',
                this.props.target
            ));
        }
    }
}

interface WeaponProps {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    target: string | null,
    index: number,
    weapon: WeaponModuleModel | undefined,
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        target: ClientSelectors.getTarget(state),
        entityId: SpaceshipSelectors.getId(state),
        weapon: SpaceshipSelectors.getWeapon(state, ownProps.index),
    };
};

export default connect(mapStateToProps)(WeaponWidget);
