import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
import { Platform } from 'react-native';

export const mmkvStorage = new MMKV({
    id: 'mmkv-storage',
    encryptionKey: Platform.OS === 'web' ? undefined : 'storage',
});

export const zustandStorage: StateStorage = {
    setItem: (name, value) => mmkvStorage.set(name, value),
    getItem: (name) => {
        const value = mmkvStorage.getString(name);
        return value ?? null;
    },
    removeItem: (name) => mmkvStorage.delete(name),
};
