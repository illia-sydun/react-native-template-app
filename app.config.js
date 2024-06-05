module.exports = {
    expo: {
        name: 'react-native-template-app',
        slug: 'react-native-template-app',
        owner: 'isydun',
        version: '1.0.0',
        jsEngine: 'hermes',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'com.isydun.react-native-template-app',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            package: 'com.isydun.react-native-template-app',
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },
        plugins: ['expo-router', 'expo-localization'],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: '7686b84d-bb62-457c-8dd6-441a714d0024',
            },
        },
    },
};
