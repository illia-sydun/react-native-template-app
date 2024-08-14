import { Ionicons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useTheme } from '@/hooks/useTheme';

export function GoogleIcon() {
    const { isDarkTheme } = useTheme();

    const color = isDarkTheme ? colors.white : colors.black;

    return <Ionicons name='logo-google' size={23} color={color} />;
}
