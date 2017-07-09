import { Action, createAction } from 'redux-actions';
import api from '../../config/api';
import { AxiosResponse, AxiosError } from 'axios';
import { User, UserStore, userStoreFactory } from './models';
import { ENDPOINTS } from '../../config/constants';
import { itemsUpdate } from '../itemsStore/ItemsActions';
import { ItemsStore, itemsStoreFactory } from '../itemsStore/models';
import { browserHistory } from 'react-router';
export const USER_RECEIVED: string = 'USER_RECEIVED';
export const USER_PENDING: string = 'USER_PENDING';

export const authResponseRecieved = createAction<UserStore | AxiosError>(USER_RECEIVED);
export const authResponsePending = createAction(USER_PENDING);

export type UserDispatch = (action: Action<UserStore | AxiosError | ItemsStore | void>) => void;
export const authorize = (user: User) => {
    return (dispatch: UserDispatch) => {
        dispatch(authResponsePending());
        return api.post(ENDPOINTS.LOGIN, user).then(
            (response: AxiosResponse) => {
                const {
                    items,
                    user,
                    auth_token
                } = response.data.snapshot;
                api.defaults.headers.common.Authorization = auth_token;
                dispatch(authResponseRecieved(userStoreFactory({ user })));
                dispatch(itemsUpdate(itemsStoreFactory(items)));
                browserHistory.replace('items');
            },
            (authError: AxiosError) => {
                dispatch(authResponseRecieved(authError));
            }
        );
    };
};
