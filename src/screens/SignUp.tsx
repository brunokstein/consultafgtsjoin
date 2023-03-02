import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { VStack, Image, Center, Heading, ScrollView, useToast } from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import loginImage from '@assets/logo.png';

import auth from '@react-native-firebase/auth';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { AppError } from '@utils/AppError';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { maskPhone } from '@utils/InputMasks';
import firestore from '@react-native-firebase/firestore';
import { storageUserSave } from '@storage/storageUser';

type FormDataProps = {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail invalido.'),
    phone: yup.string().required('Informe o celular.').length(14, 'Numero inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), ""], 'A confirmacao da senha nao confere.')
});

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    async function handleSignUp({ name, email, phone, password }: FormDataProps) {
        try {
            setIsLoading(true);
            await auth().createUserWithEmailAndPassword(email, password).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.show({
                        title: 'Email já existente',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
            });
            await storageUserSave(email);
            firestore()
                .collection('users')
                .doc(`${email}`)
                .set({
                    name: name,
                    email: email,
                    phone: phone,
                    cpf: null,
                })
                .catch((error) => console.log(error))
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Nao foi possivel criar a conta. Tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <VStack px={5}>
                    <Center>
                        <Image
                            source={loginImage}
                            resizeMode='contain'
                            alt='Nome e Logo do Aplicativo'
                            width={220}
                            height={100}
                            mt={6}
                        />
                    </Center>

                    <VStack
                        bg="gray.200"
                        borderRadius={22}
                        px={6}
                        py={8}
                        mt={10}
                        mb={8}
                    >
                        <Center>
                            <Heading color="white" fontSize="2xl" mb={4} fontFamily="heading">
                                Crie sua conta
                            </Heading>

                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        title="Nome"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        title="E-mail"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="phone"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        title="Celular"
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        onChangeText={onChange}
                                        value={maskPhone(value)}
                                        errorMessage={errors.phone?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, value } }) => (

                                    <Input
                                        title='Senha'
                                        secureTextEntry
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.password?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="password_confirm"
                                render={({ field: { onChange, value } }) => (

                                    <Input
                                        title='Confirmar senha'
                                        secureTextEntry
                                        onChangeText={onChange}
                                        value={value}
                                        //onSubmitEditing={handleSubmit(handleSignUp)}
                                        returnKeyType="send"
                                        errorMessage={errors.password_confirm?.message}
                                    />
                                )}
                            />

                            <Button
                                title="Criar e acessar"
                                onPress={handleSubmit(handleSignUp)}
                                isLoading={isLoading}
                                mt={4}
                            />
                        </Center>
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}