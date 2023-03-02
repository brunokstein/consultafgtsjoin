import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '@dtos/UserDTO';
import { USER_STORAGE } from '@storage/storageConfig';

export async function storageUserSave(email: string) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(email));
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserDTO = storage ? JSON.parse(storage) : {};

    return user;
}

export async function storageUserRemove() {
    await AsyncStorage.removeItem(USER_STORAGE);
}
