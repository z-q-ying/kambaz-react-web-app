import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Kambaz from "./Kambaz";
import Labs from "./Labs";
import store from "./Kambaz/store";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}
