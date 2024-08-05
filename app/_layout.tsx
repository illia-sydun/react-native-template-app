import { Stack } from 'expo-router';

import '../global.css';
import '../env.ts';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' />
        </Stack>
    );
}
