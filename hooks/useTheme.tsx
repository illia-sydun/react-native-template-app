import { useAndroidNavigationBarTheme } from '@/hooks/nativewind/useAndroidNavigationBarTheme';
import { useMMKVString } from 'react-native-mmkv';
import { useColorScheme as useNativewindColorScheme } from 'nativewind/dist/stylesheet';

export const useTheme = () => {
    const [theme, setTheme] = useMMKVString('theme');
    const { setColorScheme } = useNativewindColorScheme();
    const { setNavigationBarTheme } = useAndroidNavigationBarTheme();

    const isDarkTheme = theme === 'dark';

    const handleSetTheme = (newTheme: 'light' | 'dark') => {
        setColorScheme(newTheme);
        setNavigationBarTheme(newTheme);
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
