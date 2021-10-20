import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';

interface TabPageProps {
    label: string,
    enabled: boolean,
}

export default class TabPage extends React.Component<TabPageProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        enabled: true,
    };

    constructor(props: TabPageProps) {
        super(props);

        this.translation = SvgTransforms.translate(10, 50);
    }

    public render() {
        return (
            <g transform={this.translation}>
                {this.props.children}
            </g>
        );
    }
}
