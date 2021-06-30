import { useState, useReducer } from "react";
import "./App.css";
import Modal from "./modal";

const reducer = (state, action) => {
  const newPeople = [...state.people, action.payload];
  if (action.type === "NAME_ADDED") {
    return {
      ...state,
      people: newPeople,
      modalIsOpen: true,
      modalContent: "item ADDED",
    };
  } else {
    return {
      ...state,
      modalIsOpen: false,
      modalContent: "Please enter name",
    };
  }
};

const defaultState = {
  people: [],
  modalIsOpen: false,
  modalContent: "Please add name",
};

function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = { id: new Date().getTime().toString(), name };
    if (name) {
      dispatch({ type: "NAME_ADDED", payload: newName });
    } else {
      dispatch({ type: "NO_INPUT" });
    }
  };
  return (
    <>
      <Modal modalContent={state.modalContent} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add name</button>
      </form>
      {state.people.map((names) => {
        const { name } = names;
        return <h2>{name}</h2>;
      })}
    </>
  );
}

export default App;
