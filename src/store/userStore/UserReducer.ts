import { Action, handleActions } from 'redux-actions';
import { UserStore, userStoreFactory } from './models';
import { AxiosError } from 'axios';
import {
    USER_RECEIVED,
    USER_PENDING
} from './UserActions';

const userReducer = handleActions<UserStore, UserStore | AxiosError>(
    {
        [USER_PENDING](state: UserStore) {
            return state.set('isPending', true);
        },
        [USER_RECEIVED]: {
            next(state: UserStore, action: Action<UserStore>) {
                return action.payload ?
                    action.payload.set('isAuthorized', true) :
                    state.set('isPending', false);
            },
            throw(state: UserStore, action: Action<AxiosError>) {
                return state.set('error', action.payload)
                    .set('isPending', false);
            }
        }
    },
    userStoreFactory({}));

export default userReducer;
