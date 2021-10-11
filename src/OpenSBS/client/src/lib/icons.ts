export default class Icons {
    public static getTerminalIcon(type: string): string {
        return `/icons/terminals.svg#${type}`;
    }

    public static getEntityIcon(type: string): string {
        return `/icons/entities.svg#${type}`;
    }

    public static getItemIcon(type: string): string {
        return `/icons/items.svg#${type}`;
    }
}
