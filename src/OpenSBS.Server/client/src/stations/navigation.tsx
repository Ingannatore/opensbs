import * as React from 'react';
import Station from "../elements/station";
import Footer from "../elements/footer";
import Compass from "../widgets/compass";
import Helm from "../widgets/helm";

export default class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <Station>
                <Compass x={230} y={230}/>
                <Helm x={230} y={690} />

                <Footer>
                    <text x="960" y="21" textAnchor="middle" fontSize="1.5rem" fill="white">navigation</text>
                    <g transform="translate(960, 3) rotate(180)">
                        <path d="M 0 -3 L 3 3 L -3 3 Z" stroke="#36424a" strokeWidth="1" fill="#36424a"/>
                    </g>
                </Footer>
            </Station>
        );
    }
}
