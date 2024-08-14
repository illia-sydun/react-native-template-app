import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function Page() {
    const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
    const router = useRouter();

    const handleClose = () => {
        router.dismiss();
    };

    const handleCancel = () => {
        router.navigate({
            pathname: '/signin',
            params: {
                cameBackFromUserDoesNotExistScreen: String(true),
            },
        });
    };

    if (!phoneNumber) {
        return handleClose();
    }

    const handleRedirectToSignUp = async () => {
        handleClose();
        router.navigate({
            pathname: '/signup',
            params: {
                phoneNumberFromUserDoesNotExistScreen: phoneNumber,
            },
        });
    };

    return (
        <AlertDialog open>
            <AlertDialogContent className='max-w-min'>
                <AlertDialogHeader>
                    <AlertDialogTitle>User does not exist!</AlertDialogTitle>
                    <AlertDialogDescription>
                        It looks like this phone number is not registered in our
                        system. Would you like to sign up instead?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='gap-4'>
                    <AlertDialogCancel asChild>
                        <Button onPress={handleCancel} variant='outline'>
                            <Text>No, I will use another number</Text>
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onPress={handleRedirectToSignUp}>
                            <Text>Yes, continue with {phoneNumber}</Text>
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
