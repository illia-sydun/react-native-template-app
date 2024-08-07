import { useClerk } from '@clerk/clerk-expo';

export const useSignOut = () => {
    const { signOut } = useClerk();

    const handleSignOut = async () => {
        await signOut({ redirectUrl: '/' });
    };

    return {
        signOut: handleSignOut,
    };
};
