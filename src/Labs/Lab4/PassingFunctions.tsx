export default function PassingFunctions({
  theFunction,
}: {
  readonly theFunction: () => void;
}) {
  return (
    <div>
      <h2>Passing Functions</h2>
      <button onClick={theFunction} className="btn btn-primary">
        Invoke the Function
      </button>
      <hr />
    </div>
  );
}
