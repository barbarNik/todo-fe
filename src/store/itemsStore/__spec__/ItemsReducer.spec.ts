import itemReducer from '../ItemsReducer';
import * as ItemsActions from '../ItemsActions';
import { itemsStoreFactory } from '../models';

const testItem = {
    text: 'test text',
    done: false,
    id: 2,
}
describe('ItemsReducer', () => {
    it('should handle items update', () => {
        expect(itemReducer(itemsStoreFactory([]), {
            type: ItemsActions.ITEMS_UPDATE,
            payload: itemsStoreFactory([testItem]),
        }).get(2)).toEqual(testItem);
    });

    it('should handle item pending update', () => {
        expect(itemReducer(itemsStoreFactory([]), {
            type: ItemsActions.UPDATE_ITEM_PENDING,
            payload: testItem,
        }).get(2).isPending).toBeTruthy();
    });


    it('should handle item  update', () => {
        expect(itemReducer(itemsStoreFactory([]), {
            type: ItemsActions.UPDATE_ITEM,
            payload: testItem,
        }).get(2)).toEqual(testItem);
    });

    it('should handle item  delete', () => {
        expect(itemReducer(itemsStoreFactory([testItem]), {
            type: ItemsActions.DELETE_ITEM,
            payload: testItem,
        }).isEmpty()).toBeTruthy();
    });
});