import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSignInByPhoneNumber } from '@/hooks/authentication/useSignInByPhoneNumber';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/LoadingButton';

export default function Page() {
    const { signIn } = useSignInByPhoneNumber();
    const [loading, setLoading] = useState(false);

    const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
    const router = useRouter();

    const handleClose = () => {
        router.dismiss();
    };

    const handleCancel = () => {
        router.navigate({
            pathname: '/signup',
            params: {
                cameBackFromUserAlreadyExistsScreen: String(true),
            },
        });
    };

    const handleSignIn = async () => {
        setLoading(true);
        await signIn(phoneNumber, handleClose);
        setLoading(false);
    };

    if (!phoneNumber) {
        return handleClose();
    }

    return (
        <AlertDialog open>
            <AlertDialogContent className='max-w-min'>
                <AlertDialogHeader>
                    <AlertDialogTitle>User already exists!</AlertDialogTitle>
                    <AlertDialogDescription>
                        It looks like this phone number is already registered in
                        our system. If this is your account. Would you like to
                        sign in instead?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='gap-4'>
                    <AlertDialogCancel asChild>
                        <Button onPress={handleCancel} variant='outline'>
                            <Text>No, I will use another number</Text>
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <LoadingButton loading={loading} onPress={handleSignIn}>
                            <Text>Yes, continue with {phoneNumber}</Text>
                        </LoadingButton>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
