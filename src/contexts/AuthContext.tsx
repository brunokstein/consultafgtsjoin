import { createContext, ReactNode, useState, useEffect } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { FgtsDTO } from '@dtos/FgtsDTO';
import { api } from '@services/api';
import { storageUserGet } from '@storage/storageUser';

export type AuthContextDataProps = {
    user: FirebaseAuthTypes.User | null;
    fgtsData: FgtsDTO;
    getFgtsBalance: (cpf: string) => Promise<void>;
    initializingFirebase: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [fgtsData, setFgtsData] = useState<FgtsDTO>({} as FgtsDTO);

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const [initializingFirebase, setInitializingFirebase] = useState(true);

    async function getFgtsBalance(cpf: string) {
        try {
            const { data } = await api.post('/verify', {
                cpf: cpf
            });
            const fgts = data.data.fgts.Response
            setFgtsData(fgts);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((_user) => {
            setUser(_user);
            if (initializingFirebase) setInitializingFirebase(false)
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{
            user, getFgtsBalance, fgtsData, initializingFirebase
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}