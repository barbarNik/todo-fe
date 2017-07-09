import { AxiosError } from 'axios';
import { OrderedMap } from 'immutable';

export interface Item {
    id?: number;
    text: string;
    created_at?: Date;
    error?: AxiosError;
    isPending?: boolean;
    done: boolean;
}
export type ItemsStore = OrderedMap<number, Item>;

export const itemsStoreFactory = (items: Item[]): ItemsStore => {

    return OrderedMap<number, Item>(items.reduce(
        (acc, item) => {
            if (item.id) { // freaking typescript :)
                acc.push([item.id, item]);
            }
            return acc;
        },
        new Array()
        )
    );
};
