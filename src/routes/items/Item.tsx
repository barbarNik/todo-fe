import * as React from 'react';
import { Item as ItemType } from '../../store/itemsStore/models';
import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

var dateFormat = require('dateformat');

interface ItemProps {
    item: ItemType;
    requestToggleItem: (item: ItemType) => void;
    requestDeleteItem: (item: ItemType) => void;
}
interface ItemState {

}
export class Item extends React.Component<ItemProps, ItemState> {

    constructor(props: ItemProps) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onCheck() {
        const {
            item,
            requestToggleItem,
        } = this.props;
        requestToggleItem(item);
    }

    onDelete() {
        const {
            item,
            requestDeleteItem,
        } = this.props;
        requestDeleteItem(item);
    }

    render() {
        const {
            item
        } = this.props;
        return (
            <div>
                <ListItem
                    primaryText={item.text}
                    secondaryText={dateFormat(item.created_at, 'default')}

                    leftCheckbox={
                        <Checkbox
                            checked={item.done}
                            onCheck={this.onCheck}
                            disabled={item.isPending}
                        />
                    }
                    style={item.isPending ? { opacity: 0.3 } : {}}
                    rightIconButton={
                        <IconButton
                            tooltip="delete"
                            onClick={this.onDelete}
                            disabled={item.isPending}
                        >
                            <ActionDelete/>
                        </IconButton>
                    }
                />
                <Divider inset={true}/>
            </div>
        );
    }
}
