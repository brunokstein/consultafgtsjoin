import { Center, Heading, VStack, Image, ScrollView, useToast, Icon } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

import registerImage from '@assets/register-image.png'
import logoImage from '@assets/logo.png'

import auth from '@react-native-firebase/auth';

import { Input } from "@components/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'

import { maskCPF, removeCpfMask } from "@utils/InputMasks"
import { useState } from "react"
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"

import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native"
import { storageUserGet, storageUserRemove } from "@storage/storageUser"
import firestore from '@react-native-firebase/firestore';

type FormDataProps = {
    cpf: string;
}

const cpfRegisterSchema = yup.object({
    cpf: yup.string().required('Informe o cpf.').length(14, 'CPF Inválido'),
});

export function CpfRequest() {
    const [isLoading, setIsLoading] = useState(false);

    const { getFgtsBalance } = useAuth();
    const { navigate } = useNavigation<AppNavigatorRoutesProps>();

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(cpfRegisterSchema)
    });

    async function handleRegisterCpf(cpf: FormDataProps) {
        try {
            setIsLoading(true);
            const newCpf = removeCpfMask(cpf);
            await getFgtsBalance(newCpf);
            const userEmail = await storageUserGet();
            firestore()
                .collection('users')
                .doc(`${userEmail}`)
                .update({
                    cpf: cpf,
                })
                .catch((error) => console.log(error));
            navigate('fgtsbalance');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError
                ? error.message
                : "Não foi possível carregar as informações do FGTS."

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function signOut() {
        try {
            await storageUserRemove()
            auth().signOut();
            toast.show({
                title: 'Logout realizado com sucesso!',
                placement: "top",
                bgColor: "red.500",
            })
        } catch (error) {
            toast.show({
                title: 'Não foi possível realizar o logout.',
                placement: "top",
                bgColor: "red.500",
            });
        }
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <VStack flex={1} p={5}>
                    <TouchableOpacity onPress={signOut}>
                        <Icon
                            as={FontAwesome}
                            name="sign-out" size={6}
                            color='white'
                        />
                    </TouchableOpacity>
                    <Center>
                        <Image source={registerImage} resizeMode='contain' alt="Imagem representativa" width={340} height={260} />
                    </Center>
                    <VStack
                        alignItems="center"
                        bg="gray.200"
                        borderRadius={22}
                        px={6}
                        py={8}
                        mt={10}
                        mb={8}>
                        <Heading color="white">
                            Informe seu CPF
                        </Heading>

                        <Controller
                            control={control}
                            name="cpf"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="CPF"
                                    keyboardType="numeric"
                                    onChangeText={onChange}
                                    value={maskCPF(value)}
                                    errorMessage={errors.cpf?.message}
                                />
                            )}
                        />
                        <Button
                            title='Consultar'
                            onPress={handleSubmit(handleRegisterCpf)}
                            isLoading={isLoading}
                            mt={4}
                        />
                    </VStack>
                    <Center>
                        <Image
                            source={logoImage}
                            resizeMode='contain'
                            alt="Nome e Logo do Aplicativo"
                            width={120}
                            height={60}
                        />
                    </Center>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    )
}