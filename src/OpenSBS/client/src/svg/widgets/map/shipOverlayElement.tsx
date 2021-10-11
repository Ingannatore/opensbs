import * as React from 'react';
import {connect} from 'react-redux';
import Coords from '../../../lib/coords';
import SvgTransforms from '../../../lib/svgTransforms';
import Vector3 from '../../../models/vector3';
import ClientSelectors from '../../../store/client/clientSelectors';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ShipElement from '../../elements/shipElement';

interface ShipOverlayElementProps {
    x: number,
    y: number,
    mapScale: number,
    mapCenter: Vector3,
    position: Vector3,
    bearing: number,
}

class ShipOverlayElement extends React.Component<ShipOverlayElementProps, {}> {
    private readonly translation: string;

    constructor(props: ShipOverlayElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const position = Coords.translateAndScale(
            this.props.position,
            this.props.mapCenter,
            this.props.mapScale
        );

        return (
            <g transform={this.translation}>
                <ShipElement
                    x={position.x}
                    y={-position.z}
                    bearing={this.props.bearing}
                />
            </g>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        mapScale: ClientSelectors.getMapScale(state),
        mapCenter: ClientSelectors.getMapCenter(state),
        position: SpaceshipSelectors.getPosition(state),
        bearing: SpaceshipSelectors.getBearing(state),
    };
};

export default connect(mapStateToProps)(ShipOverlayElement);
