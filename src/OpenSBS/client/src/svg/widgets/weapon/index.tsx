import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from 'lib/svgTransforms';
import EntityTrace from 'models/entityTrace';
import Item from 'models/item';
import WeaponModule from 'modules/weapons/weaponModule';
import WeaponService from 'modules/weapons/weaponService';
import ClientSelectors from 'store/client/clientSelectors';
import SpaceshipActions from 'store/spaceship/spaceshipActions';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import ButtonElement from 'svg/elements/buttonElement';
import GaugeElement from 'svg/elements/gaugeElement';
import PanelElement from 'svg/elements/panelElement';
import SwitchElement from 'svg/elements/switchElement';
import FireArcElement from 'svg/widgets/weapon/fireArcElement';

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
        this.onUnload = this.onUnload.bind(this);
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
                <line x1="0" y1="30" x2="450" y2="30" stroke={ColorPalette.MUTE} strokeWidth="2"/>

                <GaugeElement
                    x={70} y={90}
                    ratio={this.props.weapon.timer.ratio}
                    label="sec"
                >{WeaponService.getTimerValue(this.props.weapon)}</GaugeElement>

                <GaugeElement
                    x={180} y={90}
                    ratio={this.props.weapon.magazine.ratio}
                    label="ammo"
                    inverse={true}
                >{this.props.weapon.magazine.quantity}</GaugeElement>

                <ButtonElement
                    x={240} y={40}
                    width={80} height={40}
                    fontSize={1.25}
                    enabled={WeaponService.isReloadButtonEnabled(this.props.weapon, this.props.selectedAmmo)}
                    onClick={this.onReload}
                >RELOAD</ButtonElement>
                <text
                    x="280" y="95"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.weapon.magazine.name || 'No Ammo'}</text>
                <ButtonElement
                    x={240} y={110}
                    width={80} height={30}
                    fontSize={1}
                    enabled={WeaponService.isUnloadButtonEnabled(this.props.weapon)}
                    onClick={this.onUnload}
                >UNLOAD</ButtonElement>

                <SwitchElement
                    x={340} y={40}
                    width={100} height={40}
                    color={ColorPalette.WARNING}
                    onClick={this.onEngage}
                    enabled={WeaponService.isFireButtonEnabled(this.props.weapon, this.props.selectedTarget)}
                    toggled={!!this.props.weapon.target}
                >FIRE</SwitchElement>

                <FireArcElement
                    x={390} y={115}
                    arcs={this.props.weapon.firingArcs}
                    targetSide={this.props.weapon.target?.spatial.relativeSide}
                />
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
        if (!this.props.weapon) {
            return;
        }
        if (!WeaponService.isReloadButtonEnabled(this.props.weapon, this.props.selectedAmmo)) {
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

    private onUnload() {
        if (!this.props.weapon) {
            return;
        }
        if (!WeaponService.isUnloadButtonEnabled(this.props.weapon)) {
            return;
        }

        this.props.dispatch(SpaceshipActions.sendModuleAction(
            this.props.entityId,
            this.props.weapon.id,
            'unload',
            null,
        ));
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
