import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoBanSharp } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>

          {/* Create two more items with IDs wd-unpublish-all-modules-and-items and wd-unpublish-modules-only */}
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <IoBanSharp className="me-1 fs-5" /> Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <IoBanSharp className="me-1 fs-5" /> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
      >
        View Progress
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
      >
        Collapse All
      </Button>
    </div>
  );
}
