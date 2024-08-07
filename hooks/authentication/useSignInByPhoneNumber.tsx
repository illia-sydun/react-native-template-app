import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { PhoneCodeFactor, SignInFirstFactor } from '@clerk/types';

export const useSignInByPhoneNumber = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const handleSignIn = async (phoneNumber: string) => {
        if (!isLoaded || !signIn) {
            return;
        }

        try {
            const { supportedFirstFactors } = await signIn.create({
                identifier: phoneNumber,
            });

            const isPhoneCodeFactor = (
                factor: SignInFirstFactor,
            ): factor is PhoneCodeFactor => factor.strategy === 'phone_code';

            const phoneCodeFactor =
                supportedFirstFactors?.find(isPhoneCodeFactor);

            if (phoneCodeFactor) {
                const { phoneNumberId } = phoneCodeFactor;

                await signIn.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                });

                router.push('/signin/verify');
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleVerifyPhoneNumber = async (verificationCode: string) => {
        if (!isLoaded && !signIn) return null;

        try {
            const signInAttempt = await signIn.attemptFirstFactor({
                strategy: 'phone_code',
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
        signIn: handleSignIn,
        verifyPhoneNumber: handleVerifyPhoneNumber,
    };
};
