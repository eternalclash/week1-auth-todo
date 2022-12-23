import { dispatchContext, todoContext } from '../context/todoContext';
import TodoItem from './TodoItem';
import { useContext, useEffect } from 'react';
import {getTodos, } from '../utils/axios-api-fn'
const TodoList = () => {
  const getTodo= useContext(todoContext);
  const dispatch = useContext(dispatchContext);

  useEffect(()=>{
    const initTodo = () => {
        getTodos()
          .then((response) => {
            console.log(response)
            dispatch({ type: "INIT", initTodos: response });
          })
          .catch((err) => {
            throw new Error(err);
          });
      };
    initTodo()
  },[])
  return (
    <>
      {getTodo ? getTodo.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem
              text={todo.todo}
              id={todo.id}
              isCompleted={todo.isCompleted}
            />
          </li>
        );
      })
      : <span>TodoList가 없습니다</span>
     
    }
    </>
  );
};

export default TodoList;