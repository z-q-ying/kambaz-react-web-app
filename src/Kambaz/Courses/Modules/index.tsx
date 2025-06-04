import { BsGripVertical } from "react-icons/bs";
import { FormControl, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  deleteLesson,
  editLesson,
  updateLesson,
  addLesson,
} from "./reducer";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {/* If not editing, show the name */}
                {!module.editing && module.name}
                {/* If editing, show the FormControl */}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                  addLesson={(moduleId) => dispatch(addLesson({ moduleId }))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {/* If not editing, show the name */}
                      {!lesson.editing && lesson.name}
                      {/* If editing, show the FormControl */}
                      {lesson.editing && (
                        <FormControl
                          className="w-50 d-inline-block"
                          // TODO: add a placeholder?
                          placeholder="Lesson name e.g., 'Introduction to React'"
                          onChange={(e) =>
                            dispatch(
                              updateLesson({
                                moduleId: module._id,
                                lesson: { ...lesson, name: e.target.value },
                              })
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(
                                updateLesson({
                                  moduleId: module._id,
                                  lesson: { ...lesson, editing: false },
                                })
                              );
                            }
                          }}
                          value={lesson.name}
                        />
                      )}
                      <LessonControlButtons
                        moduleId={module._id}
                        lessonId={lesson._id}
                        onEdit={
                          (moduleId, lessonId) =>
                            dispatch(editLesson({ moduleId, lessonId })) // set editing state to true
                        }
                        onDelete={(moduleId, lessonId) =>
                          dispatch(deleteLesson({ moduleId, lessonId }))
                        }
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
