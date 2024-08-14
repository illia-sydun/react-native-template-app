import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { ClerkAPIError, SignUpCreateParams } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/shared';

export const useSignUpByPhoneNumber = () => {
    const { isLoaded, signUp, setActive } = useSignUp();

    const router = useRouter();

    const handleSignUp = async (
        phoneNumber: string,
        params: SignUpCreateParams = {},
    ): Promise<{ error: ClerkAPIError } | undefined> => {
        if (!isLoaded && !signUp) return;

        try {
            await signUp.create({
                phoneNumber,
                ...params,
            });

            await signUp.preparePhoneNumberVerification();

            router.push({
                pathname: '/signup/verify',
                params: {
                    phoneNumber,
                },
            });
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
        if (!isLoaded && !signUp) return;

        try {
            const signInAttempt = await signUp.attemptPhoneNumberVerification({
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

    const handleResendVerificationCode = async () => {
        if (!isLoaded || !signUp) {
            return;
        }

        try {
            await signUp.preparePhoneNumberVerification();
        } catch (e) {
            console.error(JSON.stringify(e));
        }
    };

    return {
        signUp: handleSignUp,
        verifyPhoneNumber: handleVerifyPhoneNumber,
        resendVerificationCode: handleResendVerificationCode,
    };
};
