import { Action, handleActions } from 'redux-actions';
import { OrderedMap } from 'immutable';
import { Item, ItemsStore } from './models';
import {
    UPDATE_ITEM_PENDING,
    ITEMS_UPDATE,
    DELETE_ITEM,
    UPDATE_ITEM,
} from './ItemsActions';

const itemsReducer = handleActions<ItemsStore, Item | ItemsStore>(
    {
        [ITEMS_UPDATE](state: ItemsStore, action: Action<ItemsStore>) {
            return action.payload;
        },
        [UPDATE_ITEM_PENDING](state: ItemsStore, action: Action<Item>) {
            if (action.payload && action.payload.id) {
                return state.set(action.payload.id, { ...action.payload, isPending: true });
            }
            return state;
        },
        [UPDATE_ITEM](state: ItemsStore, action: Action<Item>) {
            if (action.payload && action.payload.id) {
                return state.set(action.payload.id, action.payload);
            }
            return state;
        },
        [DELETE_ITEM](state: ItemsStore, action: Action<Item>) {
            if (action.payload && action.payload.id) {
                return state.delete(action.payload.id);
            }
            return state;
        }
    },
    OrderedMap<number, Item>()
);

export default itemsReducer;