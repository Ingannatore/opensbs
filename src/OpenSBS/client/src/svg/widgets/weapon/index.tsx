import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import SpaceshipActions from '../../../store/spaceship/spaceshipActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import EntityTrace from '../../../models/entityTrace';
import PanelElement from '../../elements/panel.element';
import SwitchElement from '../../elements/switch.element';
import GaugeElement from '../../elements/gauge.element';
import ArcsElements from './arcs.elements';
import ButtonElement from '../../elements/button.element';
import WeaponModule from '../../../modules/weapons/weaponModule';
import WeaponService from '../../../modules/weapons/weaponService';
import Item from '../../../models/item';
import ColorPalette from '../../colorPalette';

interface WeaponProps {
    x: number,
    y: number,
    index: number,
    dispatch: any,
    entityId: string,
    selectedTarget: EntityTrace | null,
    selectedAmmo: Item | null,
    weapon: WeaponModule | undefined,
}

class WeaponWidget extends React.Component<WeaponProps, {}> {
    private readonly translation: string;

    constructor(props: WeaponProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onEngage = this.onEngage.bind(this);
        this.onReload = this.onReload.bind(this);
    }

    public render() {
        if (!this.props.weapon) {
            return null;
        }

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={150}>
                <text
                    x="20" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.HEADER}
                >{this.props.weapon.template.name.toUpperCase()}</text>
                <text
                    x="440" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{WeaponService.getStatus(this.props.weapon)}</text>
                <line x1="0" y1="30" x2="450" y2="30" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>

                <GaugeElement
                    x={60} y={90}
                    ratio={this.props.weapon.timer.ratio}
                    label="sec"
                >{WeaponService.getTimerValue(this.props.weapon)}</GaugeElement>

                <ArcsElements x={170} y={90}/>

                <GaugeElement
                    x={280} y={90}
                    ratio={this.props.weapon.magazine.ratio}
                    label="ammo"
                    inverse={true}
                >{this.props.weapon.magazine.quantity}</GaugeElement>

                <SwitchElement
                    x={340} y={40}
                    width={100} height={40}
                    fontSize={1.5} color={ColorPalette.WARNING}
                    onClick={this.onEngage}
                    enabled={this.isFireButtonEnabled()}
                    toggled={!!this.props.weapon.target}
                >FIRE</SwitchElement>
                <text
                    x="390" y="95"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.weapon.magazine.name || 'No Ammo'}</text>
                <ButtonElement
                    x={340} y={110}
                    width={100} height={30}
                    fontSize={1}
                    enabled={this.isReloadButtonEnabled()}
                    onClick={this.onReload}
                >RELOAD</ButtonElement>
            </PanelElement>
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

    private onReload() {
        if (!this.props.weapon || !this.isReloadButtonEnabled()) {
            return;
        }

        const ammoToReload = WeaponService.getAmmoToReload(this.props.weapon, this.props.selectedAmmo);
        if (!ammoToReload) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.weapon.id,
            'reload',
            ammoToReload,
        ));
    }

    private isFireButtonEnabled() {
        if (!this.props.weapon) {
            return false;
        }

        return WeaponService.isFireButtonEnabled(
            this.props.weapon,
            this.props.selectedTarget
        );
    }

    private isReloadButtonEnabled() {
        if (!this.props.weapon) {
            return false;
        }

        return WeaponService.isReloadButtonEnabled(
            this.props.weapon,
            this.props.selectedAmmo
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    const weapon = SpaceshipSelectors.getWeapon(state, ownProps.index);

    return {
        selectedTarget: ClientSelectors.getSelectedTarget(state),
        selectedAmmo: ClientSelectors.getSelectedAmmo(state),
        entityId: SpaceshipSelectors.getId(state),
        weapon: weapon,
    };
};

export default connect(mapStateToProps)(WeaponWidget);
