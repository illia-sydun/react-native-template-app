import Animated, {
    FadeInDown,
    FadeInUp,
    FadeOutDown,
    FadeOutUp,
} from 'react-native-reanimated';
import {
    ComponentProps,
    ComponentRef,
    forwardRef,
    ReactNode,
    useId,
    useLayoutEffect,
    useRef,
} from 'react';
import { View } from 'react-native';
import { ControllerFieldState } from 'react-hook-form/dist/types/controller';
import type { BaseAnimationBuilder } from 'react-native-reanimated';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type FormCheckboxProps = Omit<
    ComponentProps<typeof Checkbox>,
    'checked' | 'onCheckedChange'
> &
    Partial<ControllerFieldState> & {
        value: ComponentProps<typeof Checkbox>['checked'];
        onChange: ComponentProps<typeof Checkbox>['onCheckedChange'];
        label: string | ReactNode;
        description?: string | ReactNode;
    };

export const FormCheckbox = forwardRef<
    ComponentRef<typeof Checkbox>,
    FormCheckboxProps
>(
    (
        {
            value,
            onChange,
            error,
            description,
            label,
            className,
            ...inputProps
        },
        ref,
    ) => {
        const inputRef = useRef<ComponentRef<typeof Checkbox>>(null);

        const inputId = useId();

        const isAnimationsEnabled = useRef<boolean>(false);

        const ifAnimationEnabled = (
            animation: BaseAnimationBuilder,
        ): BaseAnimationBuilder | undefined =>
            isAnimationsEnabled.current ? animation : undefined;

        useLayoutEffect(() => {
            isAnimationsEnabled.current = true;
            inputRef?.current?.focus();
        }, []);

        const handleOnLabelPress = () => {
            onChange?.(!value);
        };

        return (
            <View className={cn('px-1', className)}>
                <View className='flex-row gap-3 items-center'>
                    <Checkbox
                        {...inputProps}
                        hitSlop={40}
                        checked={value}
                        onCheckedChange={onChange}
                        aria-invalid={!!error}
                        aria-labelledby={`label-${inputId}`}
                        aria-describedby={`description-${inputId}`}
                        aria-errormessage={`error-${inputId}`}
                    />
                    <Label
                        onPress={handleOnLabelPress}
                        nativeID={`label-${inputId}`}
                    >
                        {label}
                    </Label>
                </View>
                <Animated.View className='flex overflow-hidden empty:hidden'>
                    {!!description && !error && (
                        <Animated.Text
                            entering={ifAnimationEnabled(
                                FadeInUp.duration(225),
                            )}
                            exiting={ifAnimationEnabled(
                                FadeOutUp.duration(225),
                            )}
                            className='text-sm text-muted-foreground pt-1.5'
                            nativeID={`description-${inputId}`}
                        >
                            {description}
                        </Animated.Text>
                    )}
                    {error?.message && (
                        <Animated.Text
                            nativeID={`error-${inputId}`}
                            entering={ifAnimationEnabled(
                                FadeInDown.duration(225),
                            )}
                            exiting={ifAnimationEnabled(
                                FadeOutDown.duration(225),
                            )}
                            className='text-sm font-medium text-destructive pt-1.5'
                        >
                            {error?.message}
                        </Animated.Text>
                    )}
                </Animated.View>
            </View>
        );
    },
);
