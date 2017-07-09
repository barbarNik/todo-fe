import * as ItemsActions from '../../itemsStore/ItemsActions';
import { itemsStoreFactory } from '../../itemsStore/models';
import api from '../../../config/api';
import { ENDPOINTS } from '../../../config/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const axiosMockAdapter = require('axios-mock-adapter');

const mockApi = new axiosMockAdapter(api);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testItem = {
    text: 'text',
    done: false,
    id: 1,
};
describe('ItemAction', () => {
    afterEach(() => {
        mockApi.reset();
    });
    it(`should create action ${ItemsActions.UPDATE_ITEM_PENDING}`, () => {
        const action = ItemsActions.updateItemPending(testItem);
        expect(action.type).toEqual(ItemsActions.UPDATE_ITEM_PENDING);
        expect(action.payload).toEqual(testItem);
    });

    it(`should create action ${ItemsActions.ITEMS_UPDATE}`, () => {
        const action = ItemsActions.itemsUpdate(itemsStoreFactory([testItem]));
        expect(action.type).toEqual(ItemsActions.ITEMS_UPDATE);
        expect(action.payload).toEqual(itemsStoreFactory([testItem]));
    });

    it(`should create action ${ItemsActions.DELETE_ITEM}`, () => {
        const action = ItemsActions.deleteItem(testItem);
        expect(action.type).toEqual(ItemsActions.DELETE_ITEM);
        expect(action.payload).toEqual(testItem);
    });

    it(`should create action ${ItemsActions.UPDATE_ITEM}`, () => {
        const action = ItemsActions.updateItem(testItem);
        expect(action.type).toEqual(ItemsActions.UPDATE_ITEM);
        expect(action.payload).toEqual(testItem);
    });

    it('should request add item SUCCESS', () => {
        mockApi.onPost(ENDPOINTS.ITEMS).reply(200, { item: testItem });
        const expectedActions = [
            { type: ItemsActions.UPDATE_ITEM_PENDING, payload: { ...testItem, id: Number.MIN_SAFE_INTEGER } },
            { type: ItemsActions.DELETE_ITEM, payload: { ...testItem, id: Number.MIN_SAFE_INTEGER } },
            { type: ItemsActions.UPDATE_ITEM, payload: testItem },
        ];
        const store = mockStore(itemsStoreFactory([testItem]));
        return store.dispatch(ItemsActions.requestAddItem(testItem)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should request add item ERROR', () => {
        mockApi.onPost(ENDPOINTS.ITEMS).networkError();
        const expectedActions = [
            { type: ItemsActions.UPDATE_ITEM_PENDING, payload: { ...testItem, id: Number.MIN_SAFE_INTEGER } },
            {
                type: ItemsActions.UPDATE_ITEM,
                payload: { ...testItem, id: Number.MIN_SAFE_INTEGER, error: new Error('Network Error') }
            },
        ];
        const store = mockStore(itemsStoreFactory([testItem]));
        return store.dispatch(ItemsActions.requestAddItem(testItem)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should request delete item SUCCESS', () => {
        mockApi.onDelete(`${ENDPOINTS.ITEMS}/${testItem.id}`).reply(204);
        const expectedActions = [
            { type: ItemsActions.UPDATE_ITEM_PENDING, payload: testItem },
            { type: ItemsActions.DELETE_ITEM, payload: testItem },
        ];
        const store = mockStore(itemsStoreFactory([testItem]));
        return store.dispatch(ItemsActions.requestDeleteItem(testItem)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should request delete item ERROR', () => {
        mockApi.onDelete(`${ENDPOINTS.ITEMS}/${testItem.id}`).networkError();
        const expectedActions = [
            { type: ItemsActions.UPDATE_ITEM_PENDING, payload: testItem },
            {
                type: ItemsActions.UPDATE_ITEM,
                payload: { ...testItem, error: new Error('Network Error') }
            },
        ];
        const store = mockStore(itemsStoreFactory([testItem]));
        return store.dispatch(ItemsActions.requestDeleteItem(testItem)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should request toggle item SUCCESS', () => {
        mockApi.onPut(`${ENDPOINTS.ITEMS}/${testItem.id}`).reply(204);
        const expectedActions = [
            { type: ItemsActions.UPDATE_ITEM_PENDING, payload: testItem },
            { type: ItemsActions.UPDATE_ITEM, payload: { ...testItem, done: true } },
        ];
        const store = mockStore(itemsStoreFactory([]));
        return store.dispatch(ItemsActions.requestToggleItem(testItem)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should request toggle item ERROR', () => {
        mockApi.onPut(`${ENDPOINTS.ITEMS}/${testItem.id}`).networkError();
        const expectedActions = [
            { type: ItemsActions.UPDATE_ITEM_PENDING, payload: testItem },
            {
                type: ItemsActions.UPDATE_ITEM,
                payload: { ...testItem, error: new Error('Network Error') }
            },
        ];
        const store = mockStore(itemsStoreFactory([testItem]));
        return store.dispatch(ItemsActions.requestToggleItem(testItem)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});