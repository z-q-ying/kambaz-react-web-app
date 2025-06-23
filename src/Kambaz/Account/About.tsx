import { Table } from "react-bootstrap";

export default function About() {
  return (
    <div id="wd-about-screen">
      <h1>About</h1>
      <Table borderless>
        <tbody>
          <tr>
            <td className="text-end pe-3">
              <b>Project</b>
            </td>
            <td>Kambaz Quizzes Project</td>
          </tr>
          <tr>
            <td className="text-end pe-3">
              <b>Team Member</b>
            </td>
            <td>Qiuying Zhuo</td>
          </tr>
          <tr>
            <td className="text-end pe-3">
              <b>Frontend</b>
            </td>
            <td>
              <a href="https://github.com/z-q-ying/kambaz-react-web-app">
                Kambaz React Web App
              </a>
            </td>
          </tr>
          <tr>
            <td className="text-end pe-3">
              <b>Backend</b>
            </td>
            <td>
              <a href="https://github.com/z-q-ying/kambaz-node-server-app">
                Kambaz Node Server App
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
