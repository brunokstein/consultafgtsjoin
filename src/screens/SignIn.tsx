import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { VStack, Text, Center, Heading, ScrollView, useToast, HStack, Image, Modal, Button as NativeButton, Alert } from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import logoImage from '@assets/logo.png'

import auth from '@react-native-firebase/auth'

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormData = {
    email: string;
    password: string;
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showText, setShowText] = useState(false);

    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNewAccount() {
        navigate('signUp');
    }

    function handleResetPassword() {
        try {
            setIsLoading(true);
            if (userEmail.length < 1) {
                setShowText(true);
            } else {
                auth().sendPasswordResetEmail(userEmail)
                    .then(() => {
                        toast.show({
                            title: 'E-mail enviado',
                            placement: 'top',
                            bgColor: 'green.500',
                        })
                    })
                    .catch((error) => {
                        if (error.code === 'auth/invalid-email' || 'auth/user-not-found') {
                            toast.show({
                                title: 'E-mail inválido',
                                placement: 'top',
                                bgColor: 'red.500'
                            })
                        } else {
                            toast.show({
                                title: 'Não foi possivel resetar a senha. Tente novamente mais tarde.',
                                placement: 'top',
                                bgColor: 'red.500'
                            });
                        }
                    })
                setShowText(false);
                setShowModal(false);
            }
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possivel entrar. Tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false);
        }

    }

    async function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await auth().signInWithEmailAndPassword(email, password).catch(error => {
                if (error.code === 'auth/invalid-email' || 'auth/user-not-found') {
                    toast.show({
                        title: 'E-mail inválido',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
                if (error.code === 'auth/wrong-password') {
                    toast.show({
                        title: 'Senha inválida',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
            });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Nao foi possivel entrar. Tente novamente mais tarde.'

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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <VStack flex={1} px={5}>
                    <Center pt={12} pb={2}>
                        <Image source={logoImage} resizeMode='contain' alt='Nome e Logo do Aplicativo' width={255} height={125} />
                    </Center>

                    <VStack bg="gray.200" borderRadius={22} px={6} py={8} mt={10}>
                        <Center>
                            <Heading color="white" fontSize="4xl" fontFamily="heading" py={3}>
                                Login
                            </Heading>
                        </Center>
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Informe o e-mail' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    title="E-mail"
                                    keyboardType="email-address"
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                    autoCapitalize="none"
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Informe a senha' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    secureTextEntry
                                    title="Senha"
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />
                        <HStack alignItems="center" justifyContent="flex-end">
                            <TouchableOpacity onPress={() => setShowModal(true)}>
                                <Text color="white" py={1}>
                                    Esqueceu a senha?
                                </Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack alignItems="center" justifyContent="center" py={3}>
                            <Text
                                fontFamily="body"
                                fontSize="sm"
                                color="white"
                            >
                                Não tem conta?
                            </Text>
                            <TouchableOpacity onPress={handleNewAccount}>
                                <Text
                                    fontFamily="body"
                                    fontSize="sm"
                                    color="purple.700"
                                    bold
                                    ml={2}
                                >
                                    Cadastre-se agora!
                                </Text>
                            </TouchableOpacity>
                        </HStack>

                        <Button
                            title="Entrar"
                            onPress={handleSubmit(handleSignIn)}
                            isLoading={isLoading}
                        />
                    </VStack>

                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Resetar a senha</Modal.Header>
                            <Modal.Body>
                                <Input
                                    title="E-mail"
                                    keyboardType="email-address"
                                    onChangeText={(text) => setUserEmail(text)}
                                    autoCapitalize="none"
                                    modalStyle
                                />
                                {
                                    showText && <Text color="red.500" fontSize="xs" fontFamily="body">Preencha o e-mail</Text>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <NativeButton.Group space={2}>
                                    <NativeButton borderRadius={6} variant="ghost" colorScheme="purpleGray" onPress={() => {
                                        setShowModal(false);
                                    }}>
                                        Cancelar
                                    </NativeButton>
                                    <NativeButton
                                        isLoading={isLoading}
                                        colorScheme="purple"
                                        onPress={() => handleResetPassword()}
                                    >
                                        Enviar
                                    </NativeButton>
                                </NativeButton.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>

                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}