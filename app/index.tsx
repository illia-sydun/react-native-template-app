import '../translations/i18next';

import { View } from 'react-native';
import AnimatedIntro from '@/components/AnimatedIntro';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { useSignOut } from '@/hooks/authentication/useSignOut';
import { RoundedButton } from '@/components/RoundedButton';
import { useSignInWithGoogle } from '@/hooks/authentication/useSignInWithGoogle';

export default function Index() {
    const { user } = useUser();

    const { signOut } = useSignOut();
    const { signInWithGoogle: handleSignInWithGoogle } = useSignInWithGoogle();

    return (
        <View className='relative flex-1'>
            <View className='absolute h-full w-full'>
                <AnimatedIntro />
            </View>
            <View className='absolute bottom-0 w-full pb-20 gap-5 px-14'>
                <SignedIn>
                    <Link replace href='/(authenticated)' asChild>
                        <RoundedButton
                            title={`Welcome back${user?.firstName ? `, ${user?.firstName}` : ''}`}
                        />
                    </Link>
                    <RoundedButton title='Sign out' onPress={signOut} />
                </SignedIn>
                <SignedOut>
                    <Link href='/signin' asChild>
                        <RoundedButton title='Log in using OTP' />
                    </Link>
                    <Link href='/signup' asChild>
                        <RoundedButton title='Create account' />
                    </Link>
                    <RoundedButton
                        title='Continue with Google'
                        onPress={handleSignInWithGoogle}
                    />
                </SignedOut>
            </View>
        </View>
    );
}
