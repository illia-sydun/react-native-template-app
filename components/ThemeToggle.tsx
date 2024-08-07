import { Pressable, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/helpers/nativewind';
import { MoonStar } from '@/components/icons/MoonStar';
import { Sun } from '@/components/icons/Sun';

export function ThemeToggle() {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <Pressable
            onPress={toggleTheme}
            className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
        >
            {({ pressed }) => (
                <View
                    className={cn(
                        'flex-1 aspect-square pt-0.5 justify-center items-start web:px-5',
                        pressed && 'opacity-70',
                    )}
                >
                    {isDarkTheme ? (
                        <MoonStar
                            className='text-foreground'
                            size={23}
                            strokeWidth={1.25}
                        />
                    ) : (
                        <Sun
                            className='text-foreground'
                            size={24}
                            strokeWidth={1.25}
                        />
                    )}
                </View>
            )}
        </Pressable>
    );
}
