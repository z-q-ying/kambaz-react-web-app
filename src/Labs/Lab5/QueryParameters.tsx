import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        defaultValue={a}
        type="number"
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        defaultValue={b}
        type="number"
        onChange={(e) => setB(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-query-parameter-add"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger me-2"
        id="wd-query-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Substract {a} - {b}
      </a>
      {/* create additional links to test multiply and divide. use IDs starting with wd-query-parameter- */}
      <a
        className="btn btn-warning me-2"
        id="wd-query-parameter-multiply"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} * {b}
      </a>
      <a
        className="btn btn-success me-2"
        id="wd-query-parameter-divide"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Multiply {a} / {b}
      </a>
      <hr />
    </div>
  );
}
