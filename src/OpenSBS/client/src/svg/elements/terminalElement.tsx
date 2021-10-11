import * as React from 'react';
import Icons from '../../lib/icons';
import ColorPalette from '../colorPalette';

interface TerminalElementProps {
    name: string,
    icon: string | undefined,
}

export default class TerminalElement extends React.Component<TerminalElementProps, {}> {
    public static defaultProps = {
        icon: undefined,
    };

    public render() {
        return (
            <g>
                <use href="/images/terminal.svg#ui-terminal" x="0" y="0"/>
                {this.props.icon && (
                    <use
                        x="8" y="8"
                        href={Icons.getTerminalIcon(this.props.icon)}
                        transform="scale(1.5)"
                    />
                )}
                {this.props.name && (
                    <text
                        x="60" y="30"
                        fontSize="2rem"
                        fill={ColorPalette.TEXT}
                    >{this.props.name}</text>
                )}

                {this.props.children}
            </g>
        );
    }
}
