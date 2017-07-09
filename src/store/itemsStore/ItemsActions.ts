import { Action, createAction } from 'redux-actions';
import { OrderedMap } from 'immutable';
import api from '../../config/api';
import { AxiosResponse, AxiosError } from 'axios';
import { ENDPOINTS } from '../../config/constants';
import { Item } from './models';

export const UPDATE_ITEM_PENDING = 'UPDATE_ITEM_PENDING';
export const ITEMS_UPDATE = 'ITEMS_UPDATE';

export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const updateItemPending = createAction<Item>(UPDATE_ITEM_PENDING);
export const itemsUpdate = createAction<OrderedMap<number, Item>>(ITEMS_UPDATE);

export const deleteItem = createAction<Item>(DELETE_ITEM);
export const updateItem = createAction<Item>(UPDATE_ITEM);

export type ItemDispatch = (action: Action<Item>) => void;
export const requestAddItem = (item: Item) => {
    const addedItem = { ...item, id: Number.MIN_SAFE_INTEGER }; // cutting corners :)
    return (dispatch: ItemDispatch) => {
        dispatch(updateItemPending(addedItem));
        return api.post(ENDPOINTS.ITEMS, item).then(
            (response: AxiosResponse) => {
                dispatch(deleteItem(addedItem));
                dispatch(updateItem(response.data.item));
            },
            (error: AxiosError) => dispatch(updateItem({ ...addedItem, error }))
        );
    };
};

export const requestDeleteItem = (item: Item) => {
    return (dispatch: ItemDispatch) => {
        dispatch(updateItemPending(item));
        return api.delete(`${ENDPOINTS.ITEMS}/${item.id}`).then(
            (response: AxiosResponse) => dispatch(deleteItem(item)),
            (error: AxiosError) => dispatch(updateItem({ ...item, error }))
        );
    };
};

export const requestToggleItem = (item: Item) => {
    const toggledItem = { ...item, done: !item.done };
    return (dispatch: ItemDispatch) => {
        dispatch(updateItemPending(item));
        return api.put(`${ENDPOINTS.ITEMS}/${item.id}`, toggledItem).then(
            (response: AxiosResponse) => dispatch(updateItem(toggledItem)),
            (error: AxiosError) => dispatch(updateItem({ ...item, error }))
        );
    };
};
