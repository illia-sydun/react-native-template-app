import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';

import '../global.css';
import '../env';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { clerkTokenStorage } from '@/store/config';

export default function RootLayout() {
    return (
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
                            }}
                        />
                    </Stack>
                </GestureHandlerRootView>
            </ClerkLoaded>
        </ClerkProvider>
    );
}
