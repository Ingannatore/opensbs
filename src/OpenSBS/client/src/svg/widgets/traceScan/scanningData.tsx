import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import ScanningPuzzle from '../../../puzzles/scanning/scanningPuzzle';
import SignatureItem from '../../../puzzles/scanning/signatureItem';
import SwitchElement from '../../elements/switchElement';
import GroupLabel from '../../elements/groupLabel';
import ColorPalette from '../../colorPalette';

interface ScanningDataProps {
    x: number,
    y: number,
    trace: EntityTrace,
    onPuzzleCompleted: () => void,
}

interface ScanningDataState {
    highestSelectedItemsCount: number,
}

export default class ScanningData extends React.Component<ScanningDataProps, ScanningDataState> {
    private readonly translation: string;
    private readonly scanningPuzzle: ScanningPuzzle;

    constructor(props: ScanningDataProps) {
        super(props);
        this.state = {
            highestSelectedItemsCount: 0,
        }

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.scanningPuzzle = new ScanningPuzzle(this.props.trace);
        this.toggleItem = this.toggleItem.bind(this);
    }

    public render() {
        this.scanningPuzzle.refresh(this.props.trace);
        const items = this.scanningPuzzle.getItems().map(item => this.renderItem(item))
        const highestSelectedItemsCount = this.scanningPuzzle.getHighestSelectedItemsCount();

        return (
            <g transform={this.translation}>
                <GroupLabel x={60} y={20} size={60}>EMS</GroupLabel>
                <GroupLabel x={180} y={20} size={60}>GRV</GroupLabel>
                <GroupLabel x={300} y={20} size={60}>MAG</GroupLabel>

                <g transform="translate(10 50)">
                    {items}
                </g>

                <g transform="translate(400 100)">
                    <line
                        x1="0" y1="0"
                        x2="00" y2="180"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    />

                    <circle
                        cx="0" cy="0" r="16"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                        fill={ColorPalette.BACKGROUND}
                    />
                    <circle
                        cx="0" cy="0" r="10"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill={highestSelectedItemsCount > 0 ? ColorPalette.TEXT : ColorPalette.MUTE_DARK}
                    />

                    <circle
                        cx="0" cy="60" r="16"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                        fill={ColorPalette.BACKGROUND}
                    />
                    <circle
                        cx="0" cy="60" r="10"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill={highestSelectedItemsCount > 1 ? ColorPalette.TEXT : ColorPalette.MUTE_DARK}
                    />

                    <circle
                        cx="0" cy="120" r="16"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                        fill={ColorPalette.BACKGROUND}
                    />
                    <circle
                        cx="0" cy="120" r="10"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill={highestSelectedItemsCount > 2 ? ColorPalette.TEXT : ColorPalette.MUTE_DARK}
                    />

                    <circle
                        cx="0" cy="180" r="16"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                        fill={ColorPalette.BACKGROUND}
                    />
                    <circle
                        cx="0" cy="180" r="10"
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill={highestSelectedItemsCount > 3 ? ColorPalette.TEXT : ColorPalette.MUTE_DARK}
                    />
                </g>
            </g>
        );
    }

    private toggleItem(item: SignatureItem) {
        this.scanningPuzzle.toggle(item);

        const highestSelectedItemsCount = this.scanningPuzzle.getHighestSelectedItemsCount();
        this.setState({
            ...this.state,
            highestSelectedItemsCount: highestSelectedItemsCount
        });

        if (highestSelectedItemsCount >= 4) {
            this.props.onPuzzleCompleted();
        }
    }

    private renderItem(item: SignatureItem) {
        return (
            <SwitchElement
                key={'signature-item-' + item.id}
                x={item.x * 60} y={item.y * 60} rx={10}
                width={40} height={40}
                fontSize={1.5} color={ColorPalette.TERTIARY}
                onClick={() => this.toggleItem(item)}
                toggled={this.scanningPuzzle.isSelected(item)}
            >{item.value}</SwitchElement>
        );
    }
}
