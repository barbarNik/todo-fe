import * as actions from '../UserActions';
import * as ItemsActions from '../../itemsStore/ItemsActions';
import { itemsStoreFactory } from '../../itemsStore/models';
import { userStoreFactory } from '../models';
import * as _ from 'lodash';
import api from '../../../config/api';
import { ENDPOINTS } from '../../../config/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const axiosMockAdapter = require('axios-mock-adapter');

const mockApi = new axiosMockAdapter(api);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('UserActions', () => {
    afterEach(() => {
        mockApi.reset();
    });
    it('should create action to receive User', () => {
        const user = { name: 'test name' };
        const action = actions.authResponseRecieved(userStoreFactory({ user }));
        expect(action.type).toEqual(actions.USER_RECEIVED);
        expect(_.get(action, 'payload.user')).toEqual(user);
    });
    it('should create action to await User autorization', () => {
        const action = actions.authResponsePending();
        expect(action.type).toEqual(actions.USER_PENDING);
    });
    it('should autorize User SUCCESS', () => {
        const payload = {
            snapshot: {
                auth_token: 'auth_token',
                user: {
                    name: 'test name',
                    email: 'test email'
                },
                items: [{
                    id: 1,
                    text: 'buy milk',
                    done: false,
                }]
            }
        };
        mockApi.onPost(ENDPOINTS.LOGIN).reply(200, payload);
        const expectedActions = [
            { type: actions.USER_PENDING },
            { type: actions.USER_RECEIVED, payload: userStoreFactory({ user: payload.snapshot.user }) },
            { type: ItemsActions.ITEMS_UPDATE, payload: itemsStoreFactory(payload.snapshot.items) },
        ];
        const store = mockStore(userStoreFactory({}));
        return store.dispatch(actions.authorize({ password: 'test', email: 'test' })).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should autorize User FAIL', () => {
        mockApi.onPost(ENDPOINTS.LOGIN).networkError();
        const expectedActions = [
            { type: actions.USER_PENDING },
            { type: actions.USER_RECEIVED, error: true, payload: new Error('Network Error') },
        ];
        const store = mockStore(userStoreFactory({}));
        return store.dispatch(actions.authorize({ password: 'test', email: 'test' })).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});