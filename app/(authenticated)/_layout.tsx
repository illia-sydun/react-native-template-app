import { Stack } from 'expo-router/stack';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useCallback } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Layout() {
    const { isSignedIn } = useAuth();

    const headerLeft = useCallback(() => null, []);
    const headerRight = useCallback(() => <ThemeToggle />, []);

    if (!isSignedIn) {
        return <Redirect href='/' />;
    }

    return (
        <Stack
            screenOptions={{
                headerRight,
                headerLeft,
            }}
        />
    );
}
