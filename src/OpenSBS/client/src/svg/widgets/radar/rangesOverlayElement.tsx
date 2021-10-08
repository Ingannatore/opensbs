import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from '../../../store/client/clientSelectors';
import ColorPalette from '../../colorPalette';

interface RangesOverlayElementProps {
    visible: boolean,
    radarScale: number,
}

class RangesOverlayElement extends React.Component<RangesOverlayElementProps, {}> {
    private readonly increment = 100;

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const range = 400 * this.props.radarScale;
        const rangeIncrement = range / 4;

        return (
            <g>
                <text
                    x={this.increment - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement}</text>
                <circle
                    cx="0" cy="0" r={this.increment}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />

                <text
                    x={this.increment * 2 - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement * 2}</text>
                <circle
                    cx="0" cy="0" r={this.increment * 2}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />

                <text
                    x={this.increment * 3 - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement * 3}</text>
                <circle
                    cx="0" cy="0" r={this.increment * 3}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />

                <text
                    x={this.increment * 4 - 4} y="-8"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{rangeIncrement * 4}</text>
                <circle
                    cx="0" cy="0" r={this.increment * 4}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />
            </g>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        radarScale: ClientSelectors.getRadarScale(state),
    };
};

export default connect(mapStateToProps)(RangesOverlayElement);
