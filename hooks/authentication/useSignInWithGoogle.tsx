import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const useSignInWithGoogle = () => {
    const router = useRouter();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    const handleSignInWithGoogle = async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                router.replace('/(authenticated)');
            }
        } catch (err) {
            console.error('OAuth error', JSON.stringify(err));
        }
    };

    return {
        signInWithGoogle: handleSignInWithGoogle,
    };
};
