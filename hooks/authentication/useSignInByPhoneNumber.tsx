import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import {
    ClerkAPIError,
    PhoneCodeFactor,
    SignInFirstFactor,
} from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/shared';

export const useSignInByPhoneNumber = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const handleSignIn = async (
        phoneNumber: string,
        beforeRedirecting?: () => void,
    ): Promise<{ error: ClerkAPIError } | undefined> => {
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

                beforeRedirecting?.();

                router.push({
                    pathname: '/signin/verify',
                    params: { phoneNumber: phoneNumberId },
                });
            }
        } catch (e) {
            // console.error(JSON.stringify(e, null, 2));

            if (isClerkAPIResponseError(e)) {
                return { error: e.errors[0] };
            }
        }
    };

    const handleVerifyPhoneNumber = async (
        verificationCode: string,
    ): Promise<{ error: ClerkAPIError } | undefined> => {
        if (!isLoaded && !signIn) return;

        try {
            const signInAttempt = await signIn.attemptFirstFactor({
                strategy: 'phone_code',
                code: verificationCode,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/(authenticated)');
            } else {
                // console.error(signInAttempt);
            }
        } catch (e) {
            // console.error('Error:', JSON.stringify(e, null, 2));
            if (isClerkAPIResponseError(e)) {
                return { error: e.errors[0] };
            }
        }
    };

    const handleResendVerificationCode = async (phoneNumberId: string) => {
        if (!isLoaded || !signIn) {
            return;
        }

        try {
            await signIn.prepareFirstFactor({
                strategy: 'phone_code',
                phoneNumberId,
            });
        } catch (e) {
            console.error(JSON.stringify(e));
        }
    };

    return {
        signIn: handleSignIn,
        verifyPhoneNumber: handleVerifyPhoneNumber,
        resendVerificationCode: handleResendVerificationCode,
    };
};
