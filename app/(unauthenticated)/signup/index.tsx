import React, { useCallback, useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Link, useGlobalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSignUpByPhoneNumber } from '@/hooks/authentication/useSignUpByPhoneNumber';

import { FormInput } from '@/components/form/FormInput';
import { Text } from '@/components/ui/text';
import { LoadingButton } from '@/components/LoadingButton';
import { FormCheckbox } from '@/components/form/FormCheckbox';
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
    name: z.string().min(1, 'Name should not be empty.'),
    phoneNumber: z
        .string()
        .length(phoneNumberMask.length, 'Please enter a valid phone number.')
        .regex(phoneNumberRegex, 'Please enter a valid phone number.'),
    tacAgreement: z.boolean().refine((value) => value, {
        message: 'Accept terms and conditions to continue.',
    }),
    smsAgreement: z.boolean(),
});

type FormState = z.infer<typeof formSchema>;

type SearchParams = {
    cameBackFromUserAlreadyExistsScreen?: string;
    phoneNumberFromUserDoesNotExistScreen?: string;
};

export default function Page() {
    const { signUp } = useSignUpByPhoneNumber();

    const router = useRouter();
    const {
        cameBackFromUserAlreadyExistsScreen,
        phoneNumberFromUserDoesNotExistScreen,
    } = useGlobalSearchParams<SearchParams>();

    const {
        control,
        handleSubmit,
        formState: { isLoading, isSubmitting },
        setFocus,
        setValue,
        setError,
        reset,
    } = useForm<FormState>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            tacAgreement: false,
            smsAgreement: false,
        },
    });

    const handleUserAlreadyExists = (phoneNumber: string) => {
        setError('phoneNumber', {
            message: 'User with this phone number already exists!',
        });
        router.navigate({
            pathname: '/signup/userAlreadyExists',
            params: { phoneNumber },
        });
    };

    const handleSignUp = async ({
        name,
        phoneNumber,
        ...otherFormState
    }: FormState) => {
        const response = await signUp(phoneNumber, {
            firstName: name,
            unsafeMetadata: { ...otherFormState },
        });

        if (response?.error?.code === 'form_identifier_exists') {
            handleUserAlreadyExists(phoneNumber);
        }
    };

    const handleFocusPhoneNumberInput = () => {
        setFocus('phoneNumber');
    };

    const handleComingBackFromUserAlreadyExistsScreen = () => {
        handleFocusPhoneNumberInput();

        router.setParams({
            cameBackFromUserAlreadyExistsScreen: undefined,
        });
    };

    const handleSetPhoneNumberInputValue = (value: string) => {
        setValue('phoneNumber', value);
    };

    const handleComingBackFromUserDoesNotExistScreen = () => {
        handleSetPhoneNumberInputValue(
            phoneNumberFromUserDoesNotExistScreen || '',
        );

        router.setParams({
            phoneNumberFromUserDoesNotExistScreen: undefined,
        });
    };

    useEffect(() => {
        if (cameBackFromUserAlreadyExistsScreen === String(true)) {
            handleComingBackFromUserAlreadyExistsScreen();
        }
    }, [cameBackFromUserAlreadyExistsScreen]);

    useEffect(() => {
        if (phoneNumberFromUserDoesNotExistScreen) {
            handleComingBackFromUserDoesNotExistScreen();
        }
    }, [phoneNumberFromUserDoesNotExistScreen]);

    const resetFormWithFixtureData = () => {
        reset({
            name: 'Illia Sydun',
            phoneNumber: '+1 (555) 555-0100',
            tacAgreement: true,
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
                <ScrollView
                    overScrollMode='never'
                    scrollToOverflowEnabled={false}
                    bounces={false}
                    contentContainerClassName='flex-1 p-6'
                    keyboardDismissMode='on-drag'
                >
                    <H1 className='my-10'>
                        We are delighted to hear you want to join us!
                    </H1>
                    <View className='flex-1 gap-6'>
                        <Controller
                            name='name'
                            render={({ field, fieldState }) => (
                                <FormInput
                                    label='Name'
                                    placeholder='John Doe'
                                    autoComplete='name'
                                    keyboardType='default'
                                    returnKeyType='next'
                                    description='How can we call you?'
                                    textContentType='name'
                                    autoCapitalize='words'
                                    onSubmitEditing={
                                        handleFocusPhoneNumberInput
                                    }
                                    blurOnSubmit={false}
                                    {...field}
                                    {...fieldState}
                                />
                            )}
                            control={control}
                        />
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
                                    mask={phoneNumberMask}
                                    maskAutoComplete
                                    {...field}
                                    {...fieldState}
                                />
                            )}
                            control={control}
                        />
                    </View>
                    <View className='my-10 gap-6'>
                        <Controller
                            name='smsAgreement'
                            render={({ field, fieldState }) => (
                                <FormCheckbox
                                    label='I agree to receive marketing messages'
                                    description='Optional.'
                                    {...field}
                                    {...fieldState}
                                />
                            )}
                            control={control}
                        />
                        <Controller
                            name='tacAgreement'
                            render={({ field, fieldState }) => (
                                <FormCheckbox
                                    label={
                                        <>
                                            I acknowledge accepting{' '}
                                            <Link
                                                href='/signup/termsAndConditions'
                                                asChild
                                            >
                                                <Text className='text-sm native:text-base font-bold underline underline-offset-4 text-nowrap'>
                                                    Terms & Conditions
                                                </Text>
                                            </Link>
                                        </>
                                    }
                                    description='Click on the link above to learn more.'
                                    {...field}
                                    {...fieldState}
                                />
                            )}
                            control={control}
                        />
                    </View>
                    <LoadingButton
                        loading={isLoading || isSubmitting}
                        className='rounded-xl'
                        size='lg'
                        onPress={handleSubmit(handleSignUp)}
                    >
                        <Text className='text-lg font-semibold'>Sign Up</Text>
                    </LoadingButton>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
