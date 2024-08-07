import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export const useSignUpByPhoneNumber = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const handleSignUp = async (phoneNumber: string) => {
        if (!isLoaded && !signUp) return;

        try {
            await signUp.create({
                phoneNumber,
            });

            await signUp.preparePhoneNumberVerification();

            router.push('/signup/verify');
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleVerifyPhoneNumber = async (verificationCode: string) => {
        if (!isLoaded && !signUp) return;

        try {
            const signInAttempt = await signUp.attemptPhoneNumberVerification({
                code: verificationCode,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/(authenticated)');
            } else {
                console.error(signInAttempt);
            }
        } catch (err) {
            console.error('Error:', JSON.stringify(err, null, 2));
        }
    };

    return {
        signUp: handleSignUp,
        verifyPhoneNumber: handleVerifyPhoneNumber,
    };
};
