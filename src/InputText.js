import React, { useState, useReducer } from "react";
import { initialState, reducer } from "./reducer";
const InputText = () => {
  const [text, setText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = id => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      if (text === "") return;
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: Math.random(),
          text
        }
      });
      setText("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="add todo..."
        onKeyUp={handleKeyUp}
      />

      {Object.keys(state.todos).length === 0 ? (
        <p>Todo empty !!</p>
      ) : (
        state.todos.map(item => (
          <div style={style.list} key={item.id}>
            <p style={{ marginRight: 20 }}>{item.text}</p>
            <div style={style.del} onClick={() => handleDelete(item.id)}>
              x
            </div>
          </div>
        ))
      )}
    </>
  );
};

const style = {
  list: { display: "flex", alignItems: "center", justifyContent: "center" },
  del: {
    width: 32,
    height: 25,
    padding: 9,
    borderRadius: 8,
    lineHeight: "23px",
    fontWeight: 600,
    background: "cadetblue"
  }
};

export default InputText;
