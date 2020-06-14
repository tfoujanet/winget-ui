import Store from "electron-store";

const store = new Store();

export const getOrSet = (cle: string, provider: () => Promise<any>) => {
    const cacheData = store.get(cle);
    return cacheData
        ? Promise.resolve(cacheData)
        : provider().then(data => {
            store.set(cle, data);
            return data;
        });
};

export const setItem = (cle: string, data: any) => {
    store.set(cle, data);
};

export const clear = () => {
    store.clear();
};
