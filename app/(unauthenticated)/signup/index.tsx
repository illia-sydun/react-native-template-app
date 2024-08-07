import { TextInput, Button, View } from 'react-native';
import React from 'react';
import { useSignUpByPhoneNumber } from '@/hooks/authentication/useSignUpByPhoneNumber';

export default function Page() {
    const [phoneNumber, setPhoneNumber] = React.useState('+15555550100');

    const { signUp } = useSignUpByPhoneNumber();

    const handleUpdatePhoneNumber = (phone: string) => {
        setPhoneNumber(phone);
    };

    const handleSignUp = async () => {
        await signUp(phoneNumber);
    };

    return (
        <View>
            <TextInput
                autoCapitalize='none'
                value={phoneNumber}
                placeholder='Phone...'
                onChangeText={handleUpdatePhoneNumber}
            />
            <Button title='Sign Up' onPress={handleSignUp} />
        </View>
    );
}
