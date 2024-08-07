import {
    StyleSheet,
    ViewStyle,
    TextStyle,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedReaction,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import colors from 'tailwindcss/colors';
import { ReText } from 'react-native-redash';

const config = [
    {
        backgroundColor: colors.white,
        textColor: colors.black,
        text: 'Today.',
    },
    {
        backgroundColor: colors.emerald['800'],
        textColor: colors.pink['500'],
        text: 'Is.',
    },
    {
        backgroundColor: colors.orange['600'],
        textColor: colors.blue['800'],
        text: 'Another.',
    },
    {
        backgroundColor: colors.slate['800'],
        textColor: colors.zinc['300'],
        text: 'Day.',
    },
];

const ballSize = 47;
const textPadding = 9;
const delay = 800;
const duration = 600;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        position: 'absolute',
        left: 0,
        fontSize: ballSize - textPadding,
        fontWeight: '700',
        zIndex: 0,
    },
    ball: {
        position: 'absolute',
        left: 0,
        height: ballSize,
        width: ballSize,
        borderRadius: ballSize / 2,
        zIndex: 2,
    },
    mask: {
        position: 'absolute',
        left: 0,
        height: ballSize,
        width: '100%',
        borderTopLeftRadius: ballSize / 2,
        borderBottomLeftRadius: ballSize / 2,
        zIndex: 1,
    },
});

function AnimatedIntro() {
    const { width } = useWindowDimensions();
    const middle = width / 2 - ballSize / 2;

    const labelWidth = useSharedValue(0);

    const canStart = useSharedValue(false);
    const isAtStart = useSharedValue(true);

    const currentXPosition = useSharedValue(middle);
    const currentIndex = useSharedValue(0);

    const nextIndex = useDerivedValue(
        () => (currentIndex.value + 1) % config.length,
    );
    const newColorIndex = useDerivedValue(() => {
        if (isAtStart.value) {
            return currentIndex.value;
        }
        return nextIndex.value;
    });

    const containerStyle: ViewStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            currentXPosition.value,
            [middle, middle + labelWidth.value / 2],
            [
                config[newColorIndex.value].backgroundColor,
                config[currentIndex.value].backgroundColor,
            ],
            'RGB',
        ),
    }));

    const textStyle: TextStyle = useAnimatedStyle(
        () => ({
            color: interpolateColor(
                currentXPosition.value,
                [middle, middle + labelWidth.value / 2],
                [
                    config[newColorIndex.value].textColor,
                    config[currentIndex.value].textColor,
                ],
                'RGB',
            ),
            transform: [
                {
                    translateX: interpolate(
                        currentXPosition.value - textPadding,
                        [middle, middle + labelWidth.value / 2],
                        [middle, middle - labelWidth.value / 2],
                    ),
                },
            ],
        }),
        [currentIndex, currentXPosition],
    );

    const ballStyle: TextStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            currentXPosition.value,
            [middle, middle + labelWidth.value / 2],
            [
                config[newColorIndex.value].textColor,
                config[currentIndex.value].textColor,
            ],
            'RGB',
        ),
        transform: [{ translateX: currentXPosition.value }],
    }));

    const maskStyle: TextStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            currentXPosition.value,
            [middle, middle + labelWidth.value / 2],
            [
                config[newColorIndex.value].backgroundColor,
                config[currentIndex.value].backgroundColor,
            ],
            'RGB',
        ),
        transform: [{ translateX: currentXPosition.value }],
    }));

    const text = useDerivedValue(() => config[currentIndex.value].text);

    useAnimatedReaction(
        () => labelWidth.value,
        (value) => {
            currentXPosition.value = withDelay(
                delay,
                withTiming(
                    middle + textPadding + value / 2,
                    { duration },
                    (finished) => {
                        if (finished) {
                            canStart.value = true;
                            isAtStart.value = false;
                        }
                    },
                ),
            );
        },
        [middle],
    );

    useAnimatedReaction(
        () => canStart.value,
        (value) => {
            if (value) {
                canStart.value = false;
                currentXPosition.value = withDelay(
                    delay,
                    withTiming(middle, { duration }, (finished) => {
                        if (finished) {
                            currentIndex.value = nextIndex.value;
                            isAtStart.value = true;
                        }
                    }),
                );
            }
        },
        [middle, nextIndex],
    );

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <Animated.View style={[styles.ball, ballStyle]} />
            <Animated.View style={[styles.mask, maskStyle]} />
            <ReText
                style={[styles.text, textStyle]}
                onLayout={(e) => {
                    labelWidth.value = e.nativeEvent.layout.width;
                }}
                text={text}
            />
        </Animated.View>
    );
}

export default AnimatedIntro;
