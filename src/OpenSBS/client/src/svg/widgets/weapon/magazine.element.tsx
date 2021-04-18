import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import WeaponMagazineModel from '../../../modules/weapon-magazine.model';

interface AmmoPropsModel {
    x: number,
    y: number,
    magazine: WeaponMagazineModel | null,
}

export default class MagazineElement extends React.Component<AmmoPropsModel, {}> {
    private readonly translation: string;

    constructor(props: AmmoPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.magazine) {
            return (
                <g transform={this.translation}>
                    <text x="50" y="20" fontSize="1.5rem" fill="whitesmoke" textAnchor="middle">-/-</text>
                    <text x="50" y="46" fontSize=".75rem" fill="grey" textAnchor="middle">No Ammo</text>
                </g>
            );
        }

        return (
            <g transform={this.translation}>
                <text x="50" y="20" fontSize="1.5rem" fill="whitesmoke" textAnchor="middle">
                    {this.props.magazine.current}/{this.props.magazine.size}
                </text>
                <text x="50" y="46" fontSize=".75rem" fill="grey" textAnchor="middle">
                    {this.props.children}
                </text>
            </g>
        );
    }
}
