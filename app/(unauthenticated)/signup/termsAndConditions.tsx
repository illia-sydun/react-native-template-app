import { ScrollView, View } from 'react-native';
import {
    H1,
    H2,
    H3,
    H4,
    P,
    BlockQuote,
    Lead,
    Muted,
    Small,
    Large,
} from '@/components/ui/typography';

export default function Page() {
    return (
        <ScrollView className='flex-1 p-6 py-10'>
            <View className='mb-6'>
                <H1 className='mb-2'>Welcome to our application</H1>
                <Lead className='mb-4'>
                    These Terms & Conditions outline the rules and regulations
                    for the use of our service.
                </Lead>
                <Muted className='mb-4'>
                    By accessing this application, you accept these terms in
                    full. If you disagree with these terms, do not continue
                    using the service.
                </Muted>
            </View>

            <View className='mb-6'>
                <H2 className='mb-2'>1. Acceptance of Terms</H2>
                <P className='mb-4'>
                    By accessing or using our service, you agree to comply with
                    these terms. Failure to comply may result in the termination
                    of your access to the service.
                </P>
                <BlockQuote className='mb-4'>
                    "Your use of the service is conditional upon your acceptance
                    of these terms and conditions."
                </BlockQuote>
                <Small className='mb-4'>
                    These terms are subject to change. It is your responsibility
                    to review the terms periodically.
                </Small>
            </View>

            <View className='mb-6'>
                <H2 className='mb-2'>2. Use of the Service</H2>
                <P className='mb-4'>
                    You agree to use the service only for lawful purposes and in
                    a way that does not infringe the rights of others or
                    restrict or inhibit their use of the service.
                </P>
                <H3 className='mb-2'>2.1. User Responsibilities</H3>
                <P className='mb-4'>
                    As a user, you are responsible for your own conduct and any
                    consequences thereof. You agree to use the service
                    responsibly and in compliance with applicable laws.
                </P>
                <H4 className='mb-2'>2.1.1. Prohibited Conduct</H4>
                <P className='mb-4'>
                    You must not misuse the service, including but not limited
                    to: engaging in illegal activities, distributing malware, or
                    attempting to access unauthorized areas of the service.
                </P>
                <H4 className='mb-2'>2.1.2. Content Restrictions</H4>
                <P className='mb-4'>
                    You must not upload, post, or otherwise transmit content
                    that is unlawful, harmful, or offensive. We reserve the
                    right to remove such content without notice.
                </P>
                <Large className='mb-4'>
                    Remember, your actions on this platform reflect on our
                    community. Use the service with integrity and respect for
                    others.
                </Large>
            </View>

            <View className='mb-6'>
                <H2 className='mb-2'>3. Intellectual Property</H2>
                <P className='mb-4'>
                    The content, design, and functionality of the service are
                    protected by intellectual property laws. You may not
                    reproduce, distribute, or create derivative works without
                    our explicit permission.
                </P>
                <BlockQuote className='mb-4'>
                    "Respecting intellectual property rights is crucial for
                    fostering innovation and creativity."
                </BlockQuote>
                <Small className='mb-4'>
                    Any unauthorized use of the service's content may result in
                    legal action.
                </Small>
            </View>

            <View className='mb-6'>
                <H2 className='mb-2'>4. Termination</H2>
                <P className='mb-4'>
                    We reserve the right to terminate or suspend your access to
                    the service immediately, without prior notice, if you breach
                    these terms or engage in conduct that we deem harmful.
                </P>
                <H3 className='mb-2'>4.1. Reasons for Termination</H3>
                <P className='mb-4'>
                    Termination may occur for reasons including, but not limited
                    to, violation of the terms, misuse of the service, or
                    involvement in illegal activities.
                </P>
                <H4 className='mb-2'>4.1.1. Effects of Termination</H4>
                <P className='mb-4'>
                    Upon termination, your right to use the service will cease
                    immediately. Any data associated with your account may be
                    deleted without further notice.
                </P>
                <Muted className='mb-4'>
                    If you believe your access has been terminated in error,
                    please contact support@ourapp.com for assistance.
                </Muted>
            </View>

            <View className='mb-6'>
                <H2 className='mb-2'>5. Changes to Terms</H2>
                <P className='mb-4'>
                    We reserve the right to modify these terms at any time. Any
                    changes will be effective immediately upon posting on the
                    service. Your continued use of the service after changes
                    have been made constitutes your acceptance of the new terms.
                </P>
                <Large className='mb-4'>
                    We encourage you to review the terms regularly to stay
                    informed of any updates.
                </Large>
                <Small className='mb-4'>
                    Significant changes to the terms will be communicated
                    through a notice on the service.
                </Small>
            </View>

            <View className='mb-6'>
                <H2 className='mb-2'>6. Contact Us</H2>
                <P className='mb-4'>
                    If you have any questions or concerns about these Terms &
                    Conditions, please do not hesitate to contact us at
                    support@ourapp.com.
                </P>
                <Muted className='mb-4'>
                    We are committed to providing a positive experience for all
                    users. Your feedback is valuable to us.
                </Muted>
            </View>
        </ScrollView>
    );
}
