import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { AxiosError } from 'axios';

export interface User {
    name?: string;
    email?: string;
    password?: string;
}

interface UserStoreInterface {
    user?: User;
    isAuthorized?: boolean;
    error?: AxiosError;
    isPending?: boolean;
}
const defaultUserStore = {
    user: undefined,
    isAuthorized: false,
    error: undefined,
    isPending: false,
};
export interface UserStore extends TypedRecord<UserStore>, UserStoreInterface {
}

export const userStoreFactory: (user: UserStoreInterface) => UserStore =
    makeTypedFactory<UserStoreInterface, UserStore>(defaultUserStore);
