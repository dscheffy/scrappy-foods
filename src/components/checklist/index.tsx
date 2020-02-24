import { Component, h } from 'preact';
import { useReducer, useState } from 'preact/hooks';
import { AuthInfo } from '../../types';
import * as style from "./style.css";

interface ItemModel {
  item: string;
  checked: boolean;
}
interface ListModel {
  items: string[];
  selected: string[];
}
interface Toggler {
  toggle: (action: string) => void;
}
const ItemDetail = ({ item, checked }: ItemModel) => <li class={checked ? style.checked : style.unchecked}>{item}</li>
const ItemInput = ({ item, checked, toggle }: ItemModel & Toggler) => {
  return <label>
    <input
      type="checkbox"
      checked={checked}
      onClick={(e) => toggle(item)}
    />
    {item}
  </label>
}
// export const Summary = ({ title }: ListModel) => <div>{title}</div>
const ListDetail = ({ items, selected }: ListModel) => <ul>
  {items.map((item, i) => <ItemDetail key={i} item={item} checked={selected.includes(item)} />)}
</ul>
const ListForm = ({ items, selected, toggle }: ListModel & Toggler) => {
  const [selectedItems, setSelected] = useState(selected);
  return (<ul>
    {items.map((item, i) => <ItemInput key={i} item={item} checked={selected.includes(item)} toggle={toggle} />)}
  </ul>)
}
export const CheckList = (props: ListModel) => {
  const [editable, setEditable] = useState(false);
  const reducer = (state: string[], action: string) => {
    if (state.includes(action)) {
      return state.filter(x => x !== action)
    }
    return [...state, action]
  };
  const [selected, toggle] = useReducer(reducer, props.selected);
  const edit = (e: MouseEvent) => {
    e.preventDefault();
    setEditable(!editable)
  }
  return (<div>
    {editable ? <ListForm {...props} selected={selected} toggle={toggle} /> : <ListDetail {...props} selected={selected} />}
    <button onClick={edit}>{editable ? "Save" : "Edit"}</button>
  </div>)
}