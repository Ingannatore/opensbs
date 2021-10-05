import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import SwitchElement from '../../elements/switch.element';
import ColorPalette from '../../colorPalette';

interface ZoomElementProps {
    x: number,
    y: number,
    zoomFactor: number,
    dispatch: any,
}

class ZoomElement extends React.Component<ZoomElementProps, {}> {
    private readonly translation: string;

    constructor(props: ZoomElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.changeZoom = this.changeZoom.bind(this)
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
                                onClick={() => this.changeZoom(1)}
                                toggled={this.props.zoomFactor === 1}
                            >×1</SwitchElement>
                        </g>
                    </g>
                    <g transform="translate(0 0)">
                        <g transform="translate(-25 -15)">
                            <SwitchElement
                                x={0} y={0} rx={10}
                                width={50} height={30}
                                fontSize={1.25} color={ColorPalette.SECONDARY}
                                onClick={() => this.changeZoom(2)}
                                toggled={this.props.zoomFactor === 2}
                            >×2</SwitchElement>
                        </g>
                    </g>
                    <g transform="translate(60 0)">
                        <g transform="translate(-25 -15)">
                            <SwitchElement
                                x={0} y={0} rx={10}
                                width={50} height={30}
                                fontSize={1.25} color={ColorPalette.SECONDARY}
                                onClick={() => this.changeZoom(4)}
                                toggled={this.props.zoomFactor === 4}
                            >×4</SwitchElement>
                        </g>
                    </g>
                </g>
            </g>
        );
    }

    private changeZoom(factor: number) {
        this.props.dispatch(ClientActions.setZoom(factor));
    }
}

const mapStateToProps = (state: any) => {
    return {
        zoomFactor: ClientSelectors.getZoomFactor(state)
    };
};

export default connect(mapStateToProps)(ZoomElement);
