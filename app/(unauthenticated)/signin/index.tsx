import React, { useCallback, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { View, SafeAreaView, Platform } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSignInByPhoneNumber } from '@/hooks/authentication/useSignInByPhoneNumber';
import { FormInput } from '@/components/form/FormInput';
import { Text } from '@/components/ui/text';
import { LoadingButton } from '@/components/LoadingButton';
import { H1 } from '@/components/ui/typography';
import { phoneNumberMask, phoneNumberRegex } from '@/lib/formHelpers';
import { Button } from '@/components/ui/button';
import { FingerprintIcon } from '@/lib/icons/Fingerprint';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const formSchema = z.object({
    phoneNumber: z
        .string()
        .length(phoneNumberMask.length, 'Please enter a valid phone number.')
        .regex(phoneNumberRegex, 'Please enter a valid phone number.'),
});

type FormState = z.infer<typeof formSchema>;

export default function Page() {
    const { signIn } = useSignInByPhoneNumber();

    const router = useRouter();
    const { cameBackFromUserDoesNotExistScreen } = useGlobalSearchParams();

    const {
        control,
        handleSubmit,
        formState: { isLoading, isSubmitting },
        setFocus,
        setError,
        reset,
    } = useForm<FormState>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: '',
        },
    });

    const handleUserDoesNotExist = (phoneNumber: string) => {
        setError('phoneNumber', {
            message: 'User with this phone number does not exist!',
        });

        router.navigate({
            pathname: '/signin/userDoesNotExist',
            params: { phoneNumber },
        });
    };

    const handleSignIn = async ({ phoneNumber }: FormState) => {
        const response = await signIn(phoneNumber);

        if (response?.error?.code === 'form_identifier_not_found') {
            handleUserDoesNotExist(phoneNumber);
        }
    };

    const handleFocusPhoneNumberInput = () => {
        setFocus('phoneNumber');
    };

    const handleComingBackFromUserDoesNotExistScreen = () => {
        handleFocusPhoneNumberInput();

        router.setParams({
            cameBackFromUserDoesNotExistScreen: undefined,
        });
    };

    useEffect(() => {
        if (cameBackFromUserDoesNotExistScreen === String(true)) {
            handleComingBackFromUserDoesNotExistScreen();
        }
    }, [cameBackFromUserDoesNotExistScreen]);

    const handleSubmitForm = handleSubmit(handleSignIn);

    const resetFormWithFixtureData = () => {
        reset({
            phoneNumber: '+1 (555) 555-0100',
        });
    };

    const insets = useSafeAreaInsets();
    const tooltipInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12,
    };

    const headerRight = useCallback(() => {
        const button = (
            <Button
                onPress={resetFormWithFixtureData}
                className='pr-6 pl-2 native:pl-0 native:pr-0 bg-transparent'
            >
                <FingerprintIcon />
            </Button>
        );

        if (Platform.OS !== 'web') {
            return button;
        }

        return (
            <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent insets={tooltipInsets}>
                    <Text className='native:text-lg'>
                        Prefill form with fixture data
                    </Text>
                </TooltipContent>
            </Tooltip>
        );
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    headerRight,
                }}
            />

            <SafeAreaView className='flex-1'>
                <View className='flex-1 p-6'>
                    <H1 className='my-10'>Welcome back! How have you been?</H1>
                    <Animated.View className='flex-1 gap-6'>
                        <Controller
                            name='phoneNumber'
                            render={({ field, fieldState }) => (
                                <FormInput
                                    label='Phone number'
                                    description='Expect to receive message with confirmation code.'
                                    placeholder='+1 (234)-567-890'
                                    autoComplete='tel'
                                    keyboardType='phone-pad'
                                    textContentType='telephoneNumber'
                                    autoCapitalize='none'
                                    onSubmitEditing={handleSubmitForm}
                                    returnKeyType='send'
                                    returnKeyLabel='Sign In'
                                    mask={phoneNumberMask}
                                    maskAutoComplete
                                    {...field}
                                    {...fieldState}
                                />
                            )}
                            control={control}
                        />
                    </Animated.View>
                    <LoadingButton
                        loading={isSubmitting || isLoading}
                        className='rounded-xl'
                        size='lg'
                        onPress={handleSubmitForm}
                    >
                        <Text className='text-lg font-semibold'>Sign In</Text>
                    </LoadingButton>
                </View>
            </SafeAreaView>
        </>
    );
}
