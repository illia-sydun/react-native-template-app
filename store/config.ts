import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';

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

export const clerkTokenStorage: TokenCache = {
    async getToken(key: string) {
        try {
            const item = mmkvStorage.getString(key);
            if (item) {
                console.log(`${key} was used 🔐 \n`);
            } else {
                console.log(`No values stored under key: ${key}`);
            }
            return item;
        } catch (error) {
            console.error('Storage get item error: ', error);
            mmkvStorage.delete(key);
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return mmkvStorage.set(key, value);
        } catch (error) {
            console.error('Storage set item error: ', error);
        }
    },
};
