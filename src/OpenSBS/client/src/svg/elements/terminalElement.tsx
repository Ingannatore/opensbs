import * as React from 'react';

interface TerminalElementProps {
    name: string,
    icon: string,
}

export default class TerminalElement extends React.Component<TerminalElementProps, {}> {
    private readonly icon: string;

    public static defaultProps = {
        name: '',
        icon: '',
    };

    constructor(props: TerminalElementProps) {
        super(props);

        this.icon = this.props.icon ? `/images/icons.svg#${this.props.icon}` : '';
    }

    public render() {
        return (
            <g>
                <use href="/images/terminal.svg#ui-terminal" x="0" y="0"/>
                {this.icon && (
                    <use href={this.icon} x="8" y="8" transform="scale(1.5)"/>
                )}
                {this.props.name && (
                    <text x="60" y="30" fontSize="2rem" fill="#dedede">{this.props.name}</text>
                )}

                {this.props.children}
            </g>
        );
    }
}
