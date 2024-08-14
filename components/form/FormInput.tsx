import Animated, {
    type BaseAnimationBuilder,
    FadeInDown,
    FadeInUp,
    FadeOutDown,
    FadeOutUp,
} from 'react-native-reanimated';
import { View } from 'react-native';
import {
    ComponentProps,
    ComponentRef,
    forwardRef,
    ReactNode,
    useId,
    useLayoutEffect,
    useRef,
} from 'react';
import { ControllerFieldState } from 'react-hook-form/dist/types/controller';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { mergeRefs } from '@/lib/mergeRefs';

export type FormInputProps = Omit<
    ComponentProps<typeof Input>,
    'onChangeText' | 'onChange'
> &
    ControllerFieldState & {
        onChange: ComponentProps<typeof Input>['onChangeText'];
        label: string | ReactNode;
        description?: string | ReactNode;
    };

export const FormInput = forwardRef<ComponentRef<typeof Input>, FormInputProps>(
    ({ onChange, error, description, label, ...inputProps }, forwardedRef) => {
        const inputRef = useRef<ComponentRef<typeof Input>>(null);
        const inputId = useId();

        const isAnimationsEnabled = useRef<boolean>(false);

        const ifAnimationEnabled = (
            animation: BaseAnimationBuilder,
        ): BaseAnimationBuilder | undefined =>
            isAnimationsEnabled.current ? animation : undefined;

        useLayoutEffect(() => {
            isAnimationsEnabled.current = true;
        }, []);

        const handleOnLabelPress = () => {
            if (!inputRef.current) {
                return;
            }
            if (inputRef.current.isFocused()) {
                inputRef.current?.blur();
            } else {
                inputRef.current?.focus();
            }
        };

        return (
            <View>
                <Label
                    onPress={handleOnLabelPress}
                    className={cn(
                        'flex flex-row pb-2 px-px',
                        !!error && 'text-destructive',
                    )}
                    nativeID={`label-${inputId}`}
                >
                    {label}
                </Label>
                <Input
                    {...inputProps}
                    ref={mergeRefs(forwardedRef, inputRef)}
                    onChangeText={onChange}
                    aria-invalid={!!error}
                    aria-labelledby={`label-${inputId}`}
                    aria-describedby={`description-${inputId}`}
                    aria-errormessage={`error-${inputId}`}
                />
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
