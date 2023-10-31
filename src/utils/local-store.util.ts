// localStorageUtil.ts
export function saveToLocalStorage<T>(key: string, data: T): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
}

export function loadFromLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data) as T;
    }
    return null;
}

export function deleteFromLocalStorage<T>(deleteAll: boolean, key?: string): void {

    deleteAll ? localStorage.clear() : localStorage.removeItem(key!);

}
