import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  readonly todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item
      key={todo.id}
      className="d-flex justify-content-between align-items-center"
    >
      <div>{todo.title}</div>
      <div className="d-flex gap-2">
        <Button
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          variant="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}
