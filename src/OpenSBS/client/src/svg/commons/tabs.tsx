import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import TabButton from '../elements/tabButton';
import ColorPalette from '../colorPalette';
import TabPage from './tabPage';

interface TabsProps {
    x: number,
    y: number,
    width: number,
}

interface TabsState {
    selectedTab: number,
}

export default class Tabs extends React.Component<TabsProps, TabsState> {
    private readonly translation: string;

    constructor(props: TabsProps) {
        super(props);
        this.state = {
            selectedTab: 0,
        }

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.selectTab = this.selectTab.bind(this);
    }

    public render() {
        if (!this.props.children) {
            return null;
        }

        const buttons = React.Children.map(this.props.children,
            (child, index) => {
                return this.renderButton((child as TabPage).props.label, index)
            }
        );

        return (
            <g transform={this.translation}>
                <line
                    x1="1" y1="40"
                    x2={this.props.width - 1} y2="40"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                />
                {buttons}
                {React.Children.toArray(this.props.children)[this.state.selectedTab]}
            </g>
        );
    }

    private renderButton(label: string, index: number) {
        return (
            <TabButton
                x={index * 110} y={0}
                width={100} height={40}
                toggled={index === this.state.selectedTab}
                onClick={() => this.selectTab(index)}
            >{label}</TabButton>
        );
    }

    private selectTab(index: number) {
        this.setState({
            ...this.state,
            selectedTab: index
        });
    }
}
