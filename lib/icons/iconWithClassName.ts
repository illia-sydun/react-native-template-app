import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export function iconWithClassName(icon: LucideIcon) {
    cssInterop(icon, {
        className: {
            target: 'style',
            nativeStyleToProp: {
                height: true,
                width: true,
                color: true,
                opacity: true,
            },
        },
    });
}
