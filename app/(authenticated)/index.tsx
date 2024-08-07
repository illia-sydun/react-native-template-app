import { useUser } from '@clerk/clerk-expo';
import { View, Text } from 'react-native';

export default function Page() {
    const { user } = useUser();

    return (
        <View>
            <Text className='color-primary'>
                Hello{' '}
                {user?.firstName ??
                    user?.emailAddresses[0]?.emailAddress ??
                    user?.phoneNumbers[0]?.phoneNumber}
            </Text>
        </View>
    );
}
