import React from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        if (Platform.OS === 'web') {
            return;
        }
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);
};
