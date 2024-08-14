import { View, SafeAreaView, Platform } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSignUpByPhoneNumber } from '@/hooks/authentication/useSignUpByPhoneNumber';
import { H1 } from '@/components/ui/typography';
import { FormInput } from '@/components/form/FormInput';
import {
    extractUnmaskedVerificationCode,
    verificationCodeMask,
} from '@/lib/formHelpers';
import { Text } from '@/components/ui/text';
import { LoadingButton } from '@/components/LoadingButton';
import useTimer from '@/hooks/useTimer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FingerprintIcon } from '@/lib/icons/Fingerprint';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const formSchema = z.object({
    verificationCode: z.string().length(8, 'Provided code is too short.'),
});

type FormState = z.infer<typeof formSchema>;

export default function Page() {
    const { verifyPhoneNumber, resendVerificationCode } =
        useSignUpByPhoneNumber();

    const [loading, setLoading] = useState(false);
    const { timeLeft, resetTimer } = useTimer(60);

    const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { isLoading, isSubmitting },
        setError,
        reset,
    } = useForm<FormState>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            verificationCode: '',
        },
    });

    const handleVerificationCodeIsIncorrect = () => {
        setError(
            'verificationCode',
            {
                message: 'Code is incorrect!',
            },
            { shouldFocus: true },
        );
    };

    const handleVerifyPhoneNumber = async ({ verificationCode }: FormState) => {
        const response = await verifyPhoneNumber(
            extractUnmaskedVerificationCode(verificationCode),
        );

        if (response?.error?.code === 'form_code_incorrect') {
            handleVerificationCodeIsIncorrect();
        }
    };

    const handleResendVerificationCode = async () => {
        if (canResendVerificationCode) {
            setLoading(true);
            await resendVerificationCode();
            setLoading(false);
            resetTimer();
        }
    };

    const handleClose = () => {
        router.dismiss();
    };

    const canResendVerificationCode = !loading && !timeLeft;

    const verificationCodeInputDescription = useMemo(
        () => (
            <>
                Didn't receive the code?{' '}
                <Text
                    disabled={!canResendVerificationCode}
                    onPress={handleResendVerificationCode}
                    className={cn(
                        'flex-1 text-sm native:text-base font-bold underline underline-offset-4 text-nowrap cursor-pointer',
                        !canResendVerificationCode &&
                            'text-primary/40 cursor-not-allowed',
                    )}
                >
                    {loading
                        ? 'Sending...'
                        : timeLeft
                          ? `Resend in ${timeLeft} seconds`
                          : 'Resend'}
                </Text>
            </>
        ),
        [loading, timeLeft, canResendVerificationCode],
    );

    const handleSubmitForm = handleSubmit(handleVerifyPhoneNumber);

    const resetFormWithFixtureData = () => {
        reset({
            verificationCode: 'C-424242',
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

    if (!phoneNumber) {
        return handleClose();
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerRight,
                }}
            />

            <SafeAreaView className='flex-1'>
                <View className='flex-1 p-6'>
                    <H1 className='my-10'>
                        Enter the code you've received via SMS
                    </H1>
                    <View className='flex-1'>
                        <Controller
                            name='verificationCode'
                            render={({ field, fieldState }) => (
                                <FormInput
                                    label='Verification code'
                                    placeholder='C-'
                                    autoComplete='one-time-code'
                                    mask={verificationCodeMask}
                                    keyboardType='number-pad'
                                    returnKeyType='send'
                                    returnKeyLabel='Verify'
                                    description={
                                        verificationCodeInputDescription
                                    }
                                    textContentType='oneTimeCode'
                                    onSubmitEditing={handleSubmitForm}
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
                        onPress={handleSubmitForm}
                    >
                        <Text className='text-lg font-semibold'>Verify</Text>
                    </LoadingButton>
                </View>
            </SafeAreaView>
        </>
    );
}
