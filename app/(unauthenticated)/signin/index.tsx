import { TextInput, Button, View } from 'react-native';
import React from 'react';
import { useSignInByPhoneNumber } from '@/hooks/authentication/useSignInByPhoneNumber';

export default function Page() {
    const [phoneNumber, setPhoneNumber] = React.useState('+15555550100');

    const { signIn } = useSignInByPhoneNumber();

    const handleUpdatePhoneNumber = (phone: string) => {
        setPhoneNumber(phone);
    };

    const handleSignUp = async () => {
        await signIn(phoneNumber);
    };

    return (
        <View>
            <TextInput
                autoCapitalize='none'
                value={phoneNumber}
                placeholder='Phone...'
                onChangeText={handleUpdatePhoneNumber}
            />
            <Button title='Sign In' onPress={handleSignUp} />
        </View>
    );
}
