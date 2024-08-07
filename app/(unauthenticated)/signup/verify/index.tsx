import { TextInput, Button, View } from 'react-native';
import React from 'react';
import { useSignUpByPhoneNumber } from '@/hooks/authentication/useSignUpByPhoneNumber';

export default function Page() {
    const [verificationCode, setVerificationCode] = React.useState('424242');

    const { verifyPhoneNumber } = useSignUpByPhoneNumber();

    const handleUpdateVerificationCode = (code: string) => {
        setVerificationCode(code);
    };

    const handleVerifyPhoneNumber = async () => {
        await verifyPhoneNumber(verificationCode);
    };

    return (
        <View>
            <TextInput
                autoCapitalize='none'
                value={verificationCode}
                placeholder='Code...'
                onChangeText={handleUpdateVerificationCode}
            />
            <Button title='Verify' onPress={handleVerifyPhoneNumber} />
        </View>
    );
}
