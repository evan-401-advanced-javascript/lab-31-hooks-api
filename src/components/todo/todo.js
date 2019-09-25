import React, { useState, useReducer} from 'react';

import Auth from '../auth/auth.js';

import styles from './todo.module.scss';

const initialState = {
  item: '',
  toDoItem: [],
};

function reducer (state, action) {
  switch (action.type) {
    case "toggle":
      if (action.data.status === true) {
        return {...state, status: action.data.status = false};
      } else {
        return {...state, status: action.data.status = true};
      }
    default:
      throw new Error();
  }
}

export default function Todo() {


  const [item, setItem] = useState("");
  const [toDoItem, SetToDoItem] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleForm(e) {
    e.preventDefault();
    e.target.reset();
    let itemObj = {title: item, status:false};
    SetToDoItem([...toDoItem, itemObj]);
  }

  function handleChange (e) {
    setItem(e.target.value);
  }

  function toggle (e,id) {
    e.preventDefault();
    toDoItem.map( (item, idx) =>
      idx === id ? dispatch({type: 'toggle', data: item}) : item
    );
  }

  console.log(state);
  return (
    <section className={styles.todo}>

      <Auth capability="read">
        {toDoItem.map((item, idx) =>
          <div key={idx} onClick={(e) => toggle(e, idx)}>
            <span className={styles[`complete-${item.status}`]}> {item.title} </span>
          </div>
        )}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleForm}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>

    </section>
  );
}