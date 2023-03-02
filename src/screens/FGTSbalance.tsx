import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Heading, Text, useToast, Center, HStack } from 'native-base';

import fgtsImage from '@assets/fgts-image.png'
import logo from '@assets/logo.png'

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { maskCoin } from '@utils/InputMasks';

export function FGTSbalance() {
    const { fgtsData } = useAuth();

    const { goBack } = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        goBack();
    }
    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <VStack flex={1} p={5}>
                <Center>
                    <Image source={logo} resizeMode='contain' alt='Nome e Logo do Aplicativo' width={120} height={60} />
                </Center>
                <VStack alignItems="center" bg="gray.200" borderRadius={22} px={6} py={4} mt={10} mb={2}>
                    <Heading color="white" py={2}>
                        Saldo do seu FGTS
                    </Heading>

                    <VStack alignItems="center" px={4} py={6} bg="purple.700" borderRadius={12} my={4} w="100%" space={1}>
                        <Heading color="white">
                            Saldo
                        </Heading>
                        <HStack alignItems="baseline" space={2}>
                            <Text color="white" fontFamily="heading" fontSize="xl">
                                R$
                            </Text>
                            <Text color="white" fontFamily="heading" fontSize="3xl">
                                {maskCoin(fgtsData?.saldoFgts * 100)}
                            </Text>
                        </HStack>

                        <Text color="white">
                            Hoje, até o momento
                        </Text>
                    </VStack>

                    <Button
                        title='Voltar'
                        onPress={handleGoBack}
                        my={4}
                    />
                </VStack>
                <Image source={fgtsImage} resizeMode='contain' height={240} alt='Imagem representativa' />
            </VStack>
        </SafeAreaView>
    );
}