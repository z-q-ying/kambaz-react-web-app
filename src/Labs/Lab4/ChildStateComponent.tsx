export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  readonly counter: number;
  readonly setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h3>Counter {counter}</h3>
      <button
        onClick={() => setCounter(counter + 1)}
        id="wd-increment-child-state-click"
        className="btn btn-success"
      >
        Increment
      </button>{" "}
      <button
        onClick={() => setCounter(counter - 1)}
        id="wd-decrement-child-state-click"
        className="btn btn-danger"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
