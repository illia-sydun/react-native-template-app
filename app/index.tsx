import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../translations/i18next';

export default function Index() {
    const { t } = useTranslation();
    return (
        <View className='flex-1 items-center justify-center'>
            <Text>{t('welcome')}</Text>
        </View>
    );
}
