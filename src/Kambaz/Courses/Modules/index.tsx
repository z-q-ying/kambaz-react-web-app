import { BsGripVertical } from "react-icons/bs";
import { FormControl, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
  editLesson,
} from "./reducer";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");
  const dispatch = useDispatch();

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
    setModuleName("");
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  // Add lesson with API call
  const addLessonToModule = async (moduleId: string) => {
    const tempLesson = {
      name: "",
      editing: true,
    };
    try {
      const updatedModule = await modulesClient.addLessonToModule(
        moduleId,
        tempLesson
      );
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error("Error adding lesson:", error);
      // For error handling, we can manually create a temporary lesson
      const currentModule = modules.find((m: any) => m._id === moduleId);
      if (currentModule) {
        const moduleWithNewLesson = {
          ...currentModule,
          lessons: [
            ...(currentModule.lessons || []),
            { _id: Date.now().toString(), name: "", editing: true },
          ],
        };
        dispatch(updateModule(moduleWithNewLesson));
      }
    }
  };

  // Save lesson with API call
  const saveLessonInModule = async (moduleId: string, lesson: any) => {
    try {
      const updatedModule = await modulesClient.updateLessonInModule(
        moduleId,
        lesson
      );
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  // Delete lesson with API call
  const removeLessonFromModule = async (moduleId: string, lessonId: string) => {
    try {
      const updatedModule = await modulesClient.deleteLessonFromModule(
        moduleId,
        lessonId
      );
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={createModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
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
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
                addLesson={(moduleId) => addLessonToModule(moduleId)}
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
                        placeholder="Lesson name e.g., 'Introduction to React'"
                        onChange={(e) => {
                          const updatedLesson = {
                            ...lesson,
                            name: e.target.value,
                          };
                          const updatedModule = {
                            ...module,
                            lessons: module.lessons.map((l: any) =>
                              l._id === lesson._id ? updatedLesson : l
                            ),
                          };
                          dispatch(updateModule(updatedModule));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveLessonInModule(module._id, {
                              ...lesson,
                              editing: false,
                            });
                          }
                        }}
                        value={lesson.name}
                      />
                    )}
                    <LessonControlButtons
                      moduleId={module._id}
                      lessonId={lesson._id}
                      onEdit={(moduleId, lessonId) =>
                        dispatch(editLesson({ moduleId, lessonId }))
                      }
                      onDelete={(moduleId, lessonId) =>
                        removeLessonFromModule(moduleId, lessonId)
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
