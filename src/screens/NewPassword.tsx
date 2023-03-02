/* import { Center, Heading, Text, VStack, Image, ScrollView } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"

import logoImage from '@assets/logo.png'

import auth from '@react-native-firebase/auth'

import { Input } from "@components/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'

import { maskCPF } from "@utils/InputMasks"
import { TouchableOpacity } from "react-native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

type FormDataProps = {
    password: string;
    password_confirm: string;
}

const newPasswordSchema = yup.object({
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), ""], 'A confirmacao da senha nao confere.'),
});

export function NewPassword() {

    const { navigate, goBack } = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(newPasswordSchema)
    });

    function handleGoBack() {
        goBack();
    }   

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <VStack flex={1} px={5}>
                    <Center>
                        <Image
                            source={logoImage}
                            resizeMode='contain'
                            alt='Nome e Logo do Aplicativo'
                            width={260}
                            height={130}
                            mt={12}
                            mb={8}
                        />
                    </Center>
                    <VStack
                        bg="gray.200"
                        borderRadius={22}
                        px={6}
                        py={6}
                        mt={12}
                        mb={8}
                    >
                        <Center>
                            <Heading color="white" fontSize="2xl" mb={4} fontFamily="heading">
                                Trocar senha
                            </Heading>
                        </Center>

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    title="Nova senha"
                                    onChangeText={onChange}
                                    value={maskCPF(value)}
                                    errorMessage={errors.password?.message}
                                    secureTextEntry
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    title="Confirme a senha"
                                    onChangeText={onChange}
                                    value={value}
                                    returnKeyType="send"
                                    //onSubmitEditing={handleSubmit(handleSignUp)}
                                    errorMessage={errors.password_confirm?.message}
                                    secureTextEntry
                                />
                            )}
                        />

                        <Button
                            title='Trocar senha'
                            my={3}
                        />

                        <TouchableOpacity onPress={handleGoBack}>
                            <Center>
                                <Text color="white" fontFamily="heading" fontSize="md">
                                    Voltar
                                </Text>
                            </Center>
                        </TouchableOpacity>
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    )
} */