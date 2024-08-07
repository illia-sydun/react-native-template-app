import { Stack } from 'expo-router/stack';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Layout() {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href='/' />;
    }

    return (
        <Stack
            screenOptions={{
                headerRight: () => <ThemeToggle />,
            }}
        />
    );
}
