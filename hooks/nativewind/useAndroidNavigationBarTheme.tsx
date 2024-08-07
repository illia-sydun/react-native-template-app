import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { NAV_THEME } from '@/constants/nativewind';

export function useAndroidNavigationBarTheme() {
    const handleSetNavigationBarTheme = async (theme: 'light' | 'dark') => {
        if (Platform.OS !== 'android') return;
        await NavigationBar.setButtonStyleAsync(
            theme === 'dark' ? 'light' : 'dark',
        );
        await NavigationBar.setBackgroundColorAsync(
            theme === 'dark'
                ? NAV_THEME.dark.background
                : NAV_THEME.light.background,
        );
    };

    return {
        setNavigationBarTheme: handleSetNavigationBarTheme,
    };
}
