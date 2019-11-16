export interface StorageInterface {
    get(name: string): any | string;
    remove(name: string): void;
    set(name: string, value: string): void;
}
