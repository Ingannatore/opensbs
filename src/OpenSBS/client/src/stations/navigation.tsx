import * as React from 'react';
import Station from "../elements/station";
import Footer from "../elements/footer";
import Helm from "../widgets/helm";
import Bearing from "../widgets/bearing";
import Radar from "../widgets/radar";
import SvgTransform from '../lib/svg-transform';

export default class Navigation extends React.Component<{}, {}> {
    render() {
        const footerTransform = `${SvgTransform.translate(960, 3)} ${SvgTransform.rotate(180)}`;
        return (
            <Station>
                <Helm x={220} y={820} />
                <Bearing x={540} y={100}/>
                <Radar x={960} y={520}/>
                <Footer>
                    <text x="960" y="21" textAnchor="middle" fontSize="1.5rem" fill="white">navigation</text>
                    <g transform={footerTransform}>
                        <path d="M 0 -3 L 3 3 L -3 3 Z" stroke="#36424a" strokeWidth="1" fill="#36424a"/>
                    </g>
                </Footer>
            </Station>
        );
    }
}
