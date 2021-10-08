import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import SwitchElement from '../../elements/switchElement';
import ColorPalette from '../../colorPalette';

interface ZoomElementProps {
    x: number,
    y: number,
    radarScale: number,
    dispatch: any,
}

class ZoomElement extends React.Component<ZoomElementProps, {}> {
    private readonly translation: string;

    constructor(props: ZoomElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.changeRadarScale = this.changeRadarScale.bind(this)
    }

    public render() {
        return (
            <g transform={this.translation}>
                <g transform="translate(-800 50)">
                    <line
                        x1="-60" y1="0"
                        x2="60" y2="0"
                        stroke={ColorPalette.SECONDARY} strokeWidth="2"
                    />

                    <g transform="translate(-60 0)">
                        <g transform="translate(-25 -15)">
                            <SwitchElement
                                x={0} y={0} rx={10}
                                width={50} height={30}
                                fontSize={1.25} color={ColorPalette.SECONDARY}
                                onClick={() => this.changeRadarScale(20)}
                                toggled={this.props.radarScale === 20}
                            >×1</SwitchElement>
                        </g>
                    </g>
                    <g transform="translate(0 0)">
                        <g transform="translate(-25 -15)">
                            <SwitchElement
                                x={0} y={0} rx={10}
                                width={50} height={30}
                                fontSize={1.25} color={ColorPalette.SECONDARY}
                                onClick={() => this.changeRadarScale(10)}
                                toggled={this.props.radarScale === 10}
                            >×2</SwitchElement>
                        </g>
                    </g>
                    <g transform="translate(60 0)">
                        <g transform="translate(-25 -15)">
                            <SwitchElement
                                x={0} y={0} rx={10}
                                width={50} height={30}
                                fontSize={1.25} color={ColorPalette.SECONDARY}
                                onClick={() => this.changeRadarScale(5)}
                                toggled={this.props.radarScale === 5}
                            >×4</SwitchElement>
                        </g>
                    </g>
                </g>
            </g>
        );
    }

    private changeRadarScale(value: number) {
        this.props.dispatch(ClientActions.setRadarScale(value));
    }
}

const mapStateToProps = (state: any) => {
    return {
        radarScale: ClientSelectors.getRadarScale(state)
    };
};

export default connect(mapStateToProps)(ZoomElement);
