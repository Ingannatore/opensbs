import SignatureItem from './signatureItem';
import EntityTrace from '../../models/entityTrace';

export default class ScanningPuzzle {
    private trace: EntityTrace;
    private items: SignatureItem[];

    constructor(trace: EntityTrace) {
        this.trace = trace;
        this.items = ScanningPuzzle.signatureToItems(this.trace.signature);
    }

    public getItems(): SignatureItem[] {
        return this.items;
    }

    public isSelected(item: SignatureItem): boolean {
        return this.items[item.id].isSelected;
    }

    public toggle(item: SignatureItem) {
        this.items[item.id].isSelected = !this.items[item.id].isSelected;
    }

    public getHighestSelectedItemsCount(): number {
        const occurrences = this.items
        .filter(value => value.isSelected)
        .reduce(
            (results: Map<string, number>, item) => results.set(item.value, (results.get(item.value) || 0) + 1), new Map()
        );

        if (occurrences.size === 0) {
            return 0;
        }

        const occurence = Array.from(occurrences.entries()).reduce(
            (a, e) => e[1] > a[1] ? e : a
        );

        return occurence[1];
    }

    public refresh(trace: EntityTrace) {
        if (this.trace.id === trace.id) {
            return;
        }

        this.trace = trace;
        this.items = ScanningPuzzle.signatureToItems(this.trace.signature);
    }

    private static signatureToItems(signature: string[][]): SignatureItem[] {
        let counter = 0;
        return signature.flatMap(
            (column, colIndex) => column.map(
                (value, rowIndex) => {
                    return {
                        id: counter++,
                        x: colIndex,
                        y: rowIndex,
                        value: value,
                        isSelected: false,
                    }
                }
            )
        )
    }
}
