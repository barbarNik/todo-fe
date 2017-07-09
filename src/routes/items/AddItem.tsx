import * as React from 'react';
import { Item } from '../../store/itemsStore/models';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

interface AddItemProps {
    item?: Item;
    requestAddItem: (item: Item) => void;
}
interface AddItemState {
    isItemTextEmpty: boolean;
}

export default class AddItem extends React.Component<AddItemProps, AddItemState> {

    private itemTextInput: TextField | null;

    constructor(props: AddItemProps) {
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onItemTextFocus = this.onItemTextFocus.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.state = {
            isItemTextEmpty: false,
        };
    }

    onAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {
            requestAddItem
        } = this.props;
        const text = this.itemTextInput ? this.itemTextInput.getValue() : undefined;
        if (text) {
            requestAddItem({ text, done: false });
        } else {
            this.setState({ isItemTextEmpty: true });
        }

    }

    onItemTextFocus() {
        this.setState({ isItemTextEmpty: false });
    }

    renderLoading() {
        const { item } = this.props;
        if (item && item.isPending) {
            return ( <CircularProgress size={30} thickness={5}/>);
        }
        return (
            <RaisedButton
                label="Submit"
                primary={true}
                style={{ margin: 12, marginTop: 30 }}
            />
        );
    }

    render() {
        const {
            item,
        } = this.props;
        return (
            <form onSubmit={this.onAdd} style={{ textAlign: 'center' }}>
                <TextField
                    ref={(input) => {
                        this.itemTextInput = input;
                    }}
                    style={{ width: 316 }}
                    type="text"
                    disabled={item && item.isPending}
                    floatingLabelText="todo"
                    errorText={this.state.isItemTextEmpty ? 'Please fill up todo' : undefined}
                    onFocus={this.onItemTextFocus}
                />
                <br/>
                {this.renderLoading()}
            </form>
        );
    }
}