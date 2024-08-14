import '@/global.css';
import '@/env';

import { SplashScreen, Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { PortalHost } from '@rn-primitives/portal';
import { DARK_THEME, LIGHT_THEME } from '@/constants/nativewind';
import { useTheme } from '@/hooks/useTheme';
import { clerkTokenStorage } from '@/store/config';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { theme, setTheme, isDarkTheme } = useTheme();

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Adds the background color to the html element to prevent white background on overscroll.
            document.documentElement.classList.add('bg-background');
        }

        setTheme(theme === 'light' ? 'light' : 'dark');

        SplashScreen.hideAsync();
    }, []);

    return (
        <ThemeProvider value={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
            <ClerkProvider
                publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
                tokenCache={clerkTokenStorage}
            >
                <ClerkLoaded>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <Stack>
                            <Stack.Screen
                                name='index'
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name='(authenticated)'
                                options={{
                                    headerShown: false,
                                    animation: 'fade',
                                }}
                            />
                            <Stack.Screen
                                name='(unauthenticated)'
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack>
                        <PortalHost />
                    </GestureHandlerRootView>
                </ClerkLoaded>
            </ClerkProvider>
        </ThemeProvider>
    );
}
