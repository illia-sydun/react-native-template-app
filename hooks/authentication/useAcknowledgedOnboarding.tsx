import { useMMKVBoolean } from 'react-native-mmkv';

export const useOnboarding = () => {
    const [onboardingCompleted, setOnboardingCompleted] = useMMKVBoolean(
        'onboardingCompleted',
    );

    const handleCompleteOnboarding = () => {
        setOnboardingCompleted(true);
    };

    const handleResetOnboardingCompletion = () => {
        setOnboardingCompleted(false);
    };

    const isOnboardingCompleted = onboardingCompleted ?? false;

    return {
        isOnboardingCompleted,
        completeOnboarding: handleCompleteOnboarding,
        resetOnboardingCompletion: handleResetOnboardingCompletion,
    };
};
