import { useMMKVString } from 'react-native-mmkv';
import { useColorScheme as useNativewindColorScheme } from 'nativewind/dist/stylesheet';
import { setAndroidNavigationBarTheme } from '@/lib/setAndroidNavigationBarTheme';

export const useTheme = () => {
    const [theme, setTheme] = useMMKVString('theme');
    const { setColorScheme } = useNativewindColorScheme();

    const isDarkTheme = theme === 'dark';

    const handleSetTheme = (newTheme: 'light' | 'dark') => {
        setColorScheme(newTheme);
        setAndroidNavigationBarTheme(newTheme);
        setTheme(newTheme);
    };

    const handleToggleTheme = () => {
        handleSetTheme(isDarkTheme ? 'light' : 'dark');
    };

    return {
        theme,
        isDarkTheme,
        setTheme: handleSetTheme,
        toggleTheme: handleToggleTheme,
    };
};
