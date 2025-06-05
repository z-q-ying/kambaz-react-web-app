import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo, updateTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="w-50"
      />
      <div className="d-flex gap-2">
        <Button
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          variant="warning"
        >
          Update
        </Button>
        <Button
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
          variant="success"
        >
          Add
        </Button>
      </div>
    </ListGroup.Item>
  );
}
