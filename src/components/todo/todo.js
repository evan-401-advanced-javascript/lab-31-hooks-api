import React, { useState} from 'react';

import Auth from '../auth/auth.js';

import styles from './todo.module.scss';

export default function Todo(props) {

  const [item, setItem] = useState("");
  const [toDoItem, SetToDoItem] = useState([]);

  function reducer (state, action) {
    switch (action.type) {
      case "add item":
        return {...state, toDoItem: action.data}
    }
  }


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
    let toDoItemObj = toDoItem.map( (item, idx) =>
      idx === id ? {title:item.title, status:!item.status} : item
    );
    SetToDoItem({toDoItem: toDoItemObj});
  }


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