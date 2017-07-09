import userReducer from '../UserReducer';
import * as UserAction from '../UserActions';
import { userStoreFactory } from '../models';
import { AxiosError } from 'axios';

const testUser = {
    name: 'test name',
    email: 'test email',
}
describe('UserReducer', () => {
    it('should handle user pending', () => {
        expect(userReducer(userStoreFactory({}), {
            type: UserAction.USER_PENDING
        }).get('isPending')).toBeTruthy();
    });

    it('should handle user recived SUCCESS', () => {
        expect(userReducer(userStoreFactory({}), {
            type: UserAction.USER_RECEIVED,
            payload: userStoreFactory({ user: testUser })
        }).get('user')).toEqual(testUser);
    });

    it('should handle user recived FAIL', () => {
        const error = <AxiosError> {
            config: {},
            code: '401',
        };
        expect(userReducer(userStoreFactory({}), {
            type: UserAction.USER_RECEIVED,
            payload: error,
            error: true,
        }).get('error')).toEqual(error);
    });
})
