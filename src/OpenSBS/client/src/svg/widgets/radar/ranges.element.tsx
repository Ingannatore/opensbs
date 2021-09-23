import * as React from 'react';
import ClientSelectors from '../../../store/client/client.selectors';
import {connect} from 'react-redux';
import ColorPalette from '../../color-palette';

interface RangesElementProps {
    increment: number,
    visible: boolean,
    zoomFactor: number,
}

class RangesElement extends React.Component<RangesElementProps, {}> {
    public static defaultProps = {
        increment: 100,
        zoomFactor: 1,
    };

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const range = Math.round(8000 * (1 / this.props.zoomFactor));
        const rangeIncrement = range / 4;

        return (
            <g>
                <text
                    x={this.props.increment - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement}</text>
                <circle
                    cx="0" cy="0" r={this.props.increment}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />

                <text
                    x={this.props.increment * 2 - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement * 2}</text>
                <circle
                    cx="0" cy="0" r={this.props.increment * 2}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />

                <text
                    x={this.props.increment * 3 - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement * 3}</text>
                <circle
                    cx="0" cy="0" r={this.props.increment * 3}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />

                <text
                    x={this.props.increment * 4 - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement * 4}</text>
                <circle
                    cx="0" cy="0" r={this.props.increment * 4}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />
            </g>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        zoomFactor: ClientSelectors.getZoomFactor(state),
    };
};

export default connect(mapStateToProps)(RangesElement);
