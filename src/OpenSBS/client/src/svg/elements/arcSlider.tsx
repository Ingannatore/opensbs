import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface ArcSliderProps {
    cx: number,
    cy: number,
    r: number,
    size: number,
    minValue: number,
    maxValue: number,
    value: number,
    labels: string,
}

export default class ArcSlider extends React.Component<ArcSliderProps> {
    private readonly translation: string;
    private readonly path: string;

    public static defaultProps = {
        cx: 0,
        cy: 0,
        r: 160,
        value: 0,
    };

    constructor(props: ArcSliderProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.cx, this.props.cy);
        this.path = this.createPath();
    }

    render() {
        const handlerRotation = this.getHandlerRotation();
        return (
            <g cursor="pointer">
                <path d={this.path} fill="none" stroke="#383838" strokeWidth="60" strokeLinecap="round"/>
                <path d={this.path} fill="none" stroke="#020202" strokeWidth="56" strokeLinecap="round"/>
                {this.renderLabels()}
                <g transform={`rotate(${handlerRotation})`}>
                    <g transform="translate(-160 0)">
                        <circle cx="0" cy="0" r="30" stroke="#383838" strokeWidth="2" fill="#020202"/>
                        <circle cx="0" cy="0" r="26" stroke="#36c7d0" strokeWidth="1" fill="none"/>
                        <text x="0" y="0" textAnchor="middle" fontSize="1.25rem" fill="#36c7d0" transform={`rotate(${-handlerRotation})`}>
                            {this.props.value === 0 ? 'off' : this.props.value}
                        </text>
                    </g>
                </g>
            </g>
        );
    }

    private renderLabels() {
        const labels = this.props.labels.split(' ');
        const deltaAngle = (this.props.size * 90) / (labels.length - 1);

        return Array
            .from({length: labels.length}, (value, key) => key)
            .map((index: number) => {
                return {
                    angle: index * deltaAngle,
                    text: labels[index]
                }
            })
            .map((item: any) => ArcSlider.renderLabel(this.props.r, item.angle, item.text));
    }

    private static renderLabel(r: number, angle: number, text: string) {
        const transform = `translate(${r} 0) rotate(${-angle} -${r} 0)`;
        const textTransform = `rotate(${angle})`;
        return(
            <g key={'label_' + angle} transform={transform}>
                <line
                    x1="-30" y1="0"
                    x2="-22" y2="0"
                    stroke="#383838" strokeWidth="1"
                />
                <text
                    x="0" y="0" textAnchor="middle"
                    fontSize="1.25rem" fill="#999999"
                    transform={textTransform}
                >{text}</text>
                <line
                    x1="22" y1="0"
                    x2="30" y2="0"
                    stroke="#383838" strokeWidth="1"
                />
            </g>
        );
    }

    private getHandlerRotation() {
        if (this.props.value >= 0) {
            return (this.props.value / this.props.maxValue) * 180;
        } else {
            return (this.props.value / this.props.maxValue) * 90;
        }
    }

    private createPath() {
        const endingPoint = this.getEndingPoint();
        return `M ${this.props.r} 0 A ${this.props.r} ${this.props.r}, 0, 1, 0, ${endingPoint.x} ${endingPoint.y}`
    }

    private getEndingPoint() {
        switch (this.props.size) {
            case 1:
                return {x: 0, y: -this.props.r};
            case 2:
                return {x: -this.props.r, y: 0};
            case 3:
                return {x: 0, y: this.props.r};
            default:
                throw new RangeError("The size must be between 1 and 3.")
        }
    }
}
