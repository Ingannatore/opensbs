export default interface WeaponMagazine {
    ammoType: string,
    ammoId: string | null,
    name: string | null,
    quantity: number,
    ratio: number,
    isFull: boolean,
}
