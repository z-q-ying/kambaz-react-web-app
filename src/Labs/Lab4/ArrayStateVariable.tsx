import { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index)); // _ for unused item variable
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button className="btn btn-success d-flex mb-2" onClick={addElement}>
        Add Element
      </button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center border-secondary-subtle"
            key={index}
          >
            {item}
            <button
              className="btn btn-danger"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
