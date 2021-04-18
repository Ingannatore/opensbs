import * as React from 'react';
import {connect} from 'react-redux';
import WeaponPropsModel from './weapon-props.model';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import PanelElement from '../../elements/panel.element';
import SwitchElement from '../../elements/switch.element';
import ButtonElement from '../../elements/button.element';
import MagazineElement from './magazine.element';
import CounterElement from './counter.element';

class WeaponWidget extends React.Component<WeaponPropsModel, {}> {
    private readonly translation: string;

    constructor(props: WeaponPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onSwitchAmmo = this.onSwitchAmmo.bind(this);
        this.onToggleAuto = this.onToggleAuto.bind(this);
        this.onWeaponFire = this.onWeaponFire.bind(this);
    }

    public render() {
        if (!this.props.weapon) {
            return null;
        }

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={120}>
                <line x1="260" y1="0" x2="260" y2="120" stroke="#383838"/>
                <line x1="380" y1="0" x2="380" y2="120" stroke="#383838"/>

                <text x="130" y="30" fontSize="1rem" fill="whitesmoke" textAnchor="middle">
                    {this.props.weapon.name}
                </text>
                <CounterElement
                    x={25} y={56}
                    counter={this.props.weapon.counter}
                />
                <text
                    x="130" y="95"
                    fontSize="1.5rem" fill="grey"
                    textAnchor="middle"
                >Idle</text>

                <MagazineElement
                    x={270} y={10}
                    magazine={this.props.weapon.magazine}
                >Gamma-Ray Core</MagazineElement>
                <ButtonElement
                    x={270} y={80}
                    width={100} height={30}
                    fontSize={1} color='darkturquoise'
                    enabled={!!this.props.weapon.magazine}
                    onClick={this.onSwitchAmmo}
                >CHANGE</ButtonElement>

                <SwitchElement
                    x={390} y={10}
                    width={50} height={50}
                    fontSize={1} color='darkorange'
                    toggled={this.props.weapon.engaged}
                    enabled={false}
                    onClick={this.onWeaponFire}
                >FIRE</SwitchElement>
                <SwitchElement
                    x={390} y={80}
                    width={50} height={30}
                    fontSize={1} color='darkorange'
                    toggled={true}
                    onClick={this.onToggleAuto}
                >AUTO</SwitchElement>
            </PanelElement>
        );
    }

    private onSwitchAmmo() {}

    private onToggleAuto() {}

    private onWeaponFire() {}
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        entityId: SpaceshipSelectors.getId(state),
        weapon: SpaceshipSelectors.getWeapon(state, ownProps.index),
    };
};

export default connect(mapStateToProps)(WeaponWidget);
