import { View, SafeAreaView } from 'react-native';
import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { H1, P } from '@/components/ui/typography';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { FingerprintIcon } from '@/lib/icons/Fingerprint';
import { useOnboarding } from '@/hooks/authentication/useAcknowledgedOnboarding';

export default function Page() {
    const router = useRouter();
    const { completeOnboarding } = useOnboarding();

    const handleCompleteOnboarding = () => {
        completeOnboarding();
        router.dismiss();
    };

    const headerLeft = useCallback(() => null, []);

    const headerRight = useCallback(() => {
        const outlineClassName = 'absolute border-4 h-full w-full rounded-full';
        return (
            <Button
                className='px-3 mr-3 native:px-0 native:mr-0 bg-transparent'
                onPress={handleCompleteOnboarding}
            >
                <View className={`${outlineClassName} border-primary p-5`} />
                <View className={`${outlineClassName} border-primary/60 p-6`} />
                <View className={`${outlineClassName} border-primary/30 p-7`} />
                <View className={`${outlineClassName} border-primary/10 p-8`} />
                <View className={`${outlineClassName} border-primary/5 p-9`} />
                <FingerprintIcon />
            </Button>
        );
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft,
                    headerRight,
                }}
            />

            <SafeAreaView className='flex-1 bg-primary-foreground/95'>
                <View className='flex-1 p-6 mt-10'>
                    <View className='flex-1'>
                        <H1 className='mb-4 -mx-1 text-center'>
                            Fill any form in one-touch!
                        </H1>
                        <P className='mb-6 -mx-2 text-center text-lg'>
                            Your time is precious to us, and that's why we've
                            added a time-saving button wherever possible. Click
                            it to prefill the form and enjoy the smooth user
                            experience.
                        </P>
                    </View>
                    <View className='flex-1' />
                    <Button
                        variant='default'
                        size='lg'
                        className='rounded-xl'
                        onPress={handleCompleteOnboarding}
                    >
                        <Text className='!text-xl !font-semibold'>
                            Acknowledged
                        </Text>
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
}
