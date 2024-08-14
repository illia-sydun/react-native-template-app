import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useTheme } from '@/hooks/useTheme';

export function FingerprintIcon() {
    const { isDarkTheme } = useTheme();

    const color = isDarkTheme ? colors.white : colors.black;

    // return <FontAwesome6 name='wand-magic-sparkles' size={18} color={color} />;
    return <Ionicons name='finger-print-outline' size={22} color={color} />;
}
