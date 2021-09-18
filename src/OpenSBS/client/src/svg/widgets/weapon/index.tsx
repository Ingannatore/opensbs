import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import SpaceshipActions from '../../../store/spaceship/spaceship.actions';
import ClientSelectors from '../../../store/client/client.selectors';
import EntityTraceModel from '../../../modules/entity-trace.model';
import WeaponModuleModel from '../../../modules/weapon-module.model';
import PanelElement from '../../elements/panel.element';
import SwitchElement from '../../elements/switch.element';
import GaugeElement from '../../elements/gauge.element';
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

        let status = this.props.weapon.status;
        if (this.props.weaponTarget) {
            status += ` | ${this.props.weaponTarget.callSign}`
        }

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={150}>
                <text
                    x="20" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.HEADER}
                >{this.props.weapon.name.toUpperCase()}</text>
                <text
                    x="440" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{status}</text>
                <line x1="0" y1="30" x2="450" y2="30" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>

                <GaugeElement
                    x={70} y={90}
                    value={Math.max(0, Math.ceil(this.props.weapon.timer.current)).toString()}
                    ratio={this.props.weapon.timer.ratio}
                    label="seconds"
                />

                <SwitchElement
                    x={340} y={40}
                    width={100} height={100}
                    fontSize={1.5} color={ColorPalette.WARNING}
                    onClick={this.onEngage}
                    enabled={this.props.weapon.target != null || this.props.selectedTarget != null}
                    toggled={!!this.props.weapon.target}
                >ENGAGE</SwitchElement>

                <g opacity={0}>
                    <line x1="0" y1="40" x2="450" y2="40" stroke={ColorPalette.DANGER} strokeWidth="1"/>
                    <line x1="0" y1="140" x2="450" y2="140" stroke={ColorPalette.DANGER} strokeWidth="1"/>
                    <line x1="20" y1="0" x2="20" y2="150" stroke={ColorPalette.DANGER} strokeWidth="1"/>
                </g>
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
