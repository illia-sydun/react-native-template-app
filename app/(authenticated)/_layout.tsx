import { Stack } from 'expo-router/stack';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Layout() {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href='/' />;
    }

    return <Stack />;
}
