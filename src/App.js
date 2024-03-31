import { React, useEffect, useState } from "react";
import "./App.css";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";

function App() {
  const [isTodo, setIsTodo] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDescription,
    };

    let todoListArray = [...allTodos];
    todoListArray.push(newTodo);
    setAllTodos(todoListArray);
    localStorage.setItem("todolist", JSON.stringify(todoListArray));
  };

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    // setAllTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTodo = () =>{
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setAllTodos(newTodo);
    setCurrentEdit("");
    
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev)=>{
      return{...prev,title:value}

    })
  };
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev)=>{
      return{...prev,description:value}

    })
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hh = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + m + ":" + s;
    console.log(completedOn);
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompleted = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todolist"));
    let completedtodos = JSON.parse(localStorage.getItem("completedTodos"));
    if (todos) {
      setAllTodos(todos);
    }
    if (completedtodos) {
      setCompletedTodos(completedtodos);
    }
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="button">
            <button
              type="button"
              className="primaryButton"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="button-area">
          <button
            type="button"
            className={`secondaryButton ${
              isTodo === true ? "active" : "inActive"
            }`}
            onClick={() => setIsTodo(true)}
          >
            Todo
          </button>
          <button
            type="button"
            className={`secondaryButton ${
              isTodo === false ? "active" : "inActive"
            }`}
            onClick={() => setIsTodo(false)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list-section">
          {isTodo &&
            allTodos &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit_wrapper" key={index}>
                    <input
                      placeholder="Updated Title"
                      value={currentEditedItem.title}
                      onChange={(e) => {
                        handleUpdateTitle(e.target.value);
                      }}
                    />
                    <textarea
                    rows={4}
                      placeholder="Updated Description"
                      value={currentEditedItem.description}
                      onChange={(e) => {
                        handleUpdateDescription(e.target.value);
                      }}
                    />
                    <button
              type="button"
              className="primaryButton"
              onClick={handleUpdateTodo}
            >
              Update
            </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div className="">
                      <MdOutlineDelete
                        className="icon"
                        onClick={() => handleDelete(index)}
                        title="Delete?"
                      />
                      <FaCheck
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Submit?"
                      />
                      <TbEdit
                        className="edit-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}

          {!isTodo &&
            completedTodos &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div className="">
                    <MdOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompleted(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
