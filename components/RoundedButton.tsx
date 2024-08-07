import { Pressable, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { ComponentProps, forwardRef } from 'react';

export type RoundedButtonProps = ComponentProps<typeof Pressable> & {
    title: string;
};

export const RoundedButton = forwardRef(
    ({ title, ...pressableProps }: RoundedButtonProps, ref) => (
        <Pressable
            className='rounded-3xl overflow-hidden'
            ref={ref}
            {...pressableProps}
        >
            <BlurView
                intensity={60}
                tint='dark'
                className='px-8 py-4 items-center'
                experimentalBlurMethod='dimezisBlurView'
            >
                <Text className='text-xl color-white font-semibold'>
                    {title}
                </Text>
            </BlurView>
        </Pressable>
    ),
);
