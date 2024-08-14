import { Stack } from 'expo-router/stack';
import { usePathname, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { ArrowLeft } from '@/lib/icons/ArrowLeft';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/authentication/useAcknowledgedOnboarding';

export default function Layout() {
    const { isSignedIn } = useAuth();

    const router = useRouter();
    const pathname = usePathname();
    const { isOnboardingCompleted } = useOnboarding();

    const handleGoToHomePage = () => {
        router.navigate('/');
    };

    const handleCloseModal = () => {
        router.dismiss();
    };

    const headerLeft = useCallback(
        (onPress: () => void) =>
            function () {
                return (
                    <Button
                        onPress={onPress}
                        className='flex-row items-center gap-1 pl-6 pr-2 native:pl-0 native:pr-0 bg-transparent'
                    >
                        <ArrowLeft size={28} className='text-primary' />
                        <Text className='text-lg font-medium hidden native:visible'>
                            Back
                        </Text>
                    </Button>
                );
            },
        [],
    );

    const noHeaderLeft = useCallback(() => null, []);

    const headerLeftForScreen = headerLeft(handleGoToHomePage);

    const headerLeftForModal =
        Platform.OS === 'ios' ? noHeaderLeft : headerLeft(handleCloseModal);

    useEffect(() => {
        if (
            !isSignedIn &&
            pathname !== '/onboarding' &&
            !isOnboardingCompleted
        ) {
            setTimeout(() => router.navigate('/onboarding'), 350);
        }
    }, [isSignedIn, pathname, isOnboardingCompleted]);

    if (isSignedIn) {
        return router.replace('/(authenticated)');
    }

    return (
        <Stack>
            <Stack.Screen
                name='onboarding'
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    presentation: 'containedTransparentModal',
                    animation: 'fade',
                }}
            />
            <Stack.Screen
                name='signin/index'
                options={{
                    title: 'Log in',
                    headerLeft: headerLeftForScreen,
                }}
            />
            <Stack.Screen
                name='signin/userDoesNotExist'
                options={{
                    headerShown: false,
                    presentation: 'containedTransparentModal',
                }}
            />
            <Stack.Screen
                name='signin/verify'
                options={{
                    title: 'Verify phone number',
                    presentation: 'modal',
                    headerLeft: headerLeftForModal,
                }}
            />
            <Stack.Screen
                name='signup/index'
                options={{
                    title: 'Create account',
                    headerLeft: headerLeftForScreen,
                }}
            />
            <Stack.Screen
                name='signup/termsAndConditions'
                options={{
                    title: 'Terms & Conditions',
                    presentation: 'modal',
                    headerLeft: headerLeftForModal,
                }}
            />
            <Stack.Screen
                name='signup/userAlreadyExists'
                options={{
                    headerShown: false,
                    presentation: 'containedTransparentModal',
                }}
            />
            <Stack.Screen
                name='signup/verify'
                options={{
                    title: 'Verify phone number',
                    presentation: 'modal',
                    headerLeft: headerLeftForModal,
                }}
            />
        </Stack>
    );
}
