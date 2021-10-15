export default class Icons {
    public static forTerminal(type: string): string {
        return `/icons/terminals.svg#${type}`;
    }

    public static forEntity(type: string): string {
        return `/icons/entities.svg#${type}`;
    }

    public static forItem(type: string): string {
        return `/icons/items.svg#${type}`;
    }
}
