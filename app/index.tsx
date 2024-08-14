import '@/translations/i18next';

import { View } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import AnimatedIntro from '@/components/AnimatedIntro';
import { useSignOut } from '@/hooks/authentication/useSignOut';
import { useSignInWithGoogle } from '@/hooks/authentication/useSignInWithGoogle';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { GoogleIcon } from '@/lib/icons/Google';
import { useOnboarding } from '@/hooks/authentication/useAcknowledgedOnboarding';

export default function Index() {
    const { user } = useUser();

    const { resetOnboardingCompletion } = useOnboarding();

    const { signOut } = useSignOut();
    const { signInWithGoogle: handleSignInWithGoogle } = useSignInWithGoogle();

    return (
        <View className='relative flex-1'>
            <View className='absolute h-full w-full'>
                <AnimatedIntro />
            </View>
            <View className='absolute bottom-0 w-full pb-16 gap-4 px-14'>
                <SignedIn>
                    <Link replace href='/(authenticated)' asChild>
                        <Button variant='default' size='lg'>
                            <Text className='!text-xl !font-semibold'>
                                {`Welcome back${user?.firstName ? `, ${user?.firstName}` : ''}`}
                            </Text>
                        </Button>
                    </Link>
                    <Button variant='secondary' size='lg' onPress={signOut}>
                        <Text className='!text-xl !font-semibold'>
                            Sign out
                        </Text>
                    </Button>
                </SignedIn>
                <SignedOut>
                    <Link href='/signin' asChild>
                        <Button
                            variant='default'
                            size='lg'
                            onLongPress={resetOnboardingCompletion}
                        >
                            <Text className='!text-xl !font-semibold'>
                                Log in
                            </Text>
                        </Button>
                    </Link>
                    <Link href='/signup' asChild>
                        <Button variant='secondary' size='lg'>
                            <Text className='!text-xl !font-semibold'>
                                Create account
                            </Text>
                        </Button>
                    </Link>
                    <Button
                        variant='outline'
                        size='lg'
                        onPress={handleSignInWithGoogle}
                        className='flex flex-row gap-6'
                    >
                        <GoogleIcon />
                        <Text className='!text-xl !font-semibold'>
                            Continue with Google
                        </Text>
                    </Button>
                </SignedOut>
            </View>
        </View>
    );
}
