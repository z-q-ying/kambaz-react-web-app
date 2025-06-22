import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import Editor from "react-simple-wysiwyg";

import * as client from "./client";

export default function QuestionEditor({
  question,
  onCancel,
  onSave,
}: {
  readonly question: any;
  readonly onCancel: () => void;
  readonly onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    title: question.title || "",
    type: question.type || "multiple-choice",
    question: question.question || "",
    points: question.points || 1,
    multipleChoiceOptions: question.multipleChoiceOptions || [
      { id: "option1", text: "", isCorrect: false },
      { id: "option2", text: "", isCorrect: false },
    ],
    trueFalseCorrectAnswer: question.trueFalseCorrectAnswer || true,
    fillInBlankAnswers: question.fillInBlankAnswers?.flatMap(
      (item: any) => item.correctAnswers || []
    ) || [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSave = async () => {
    const updatedQuestion: any = {
      _id: question._id,
      title: formData.title,
      type: formData.type,
      question: formData.question,
      points: formData.points,
    };

    if (formData.type === "multiple-choice") {
      updatedQuestion.multipleChoiceOptions = formData.multipleChoiceOptions;
    } else if (formData.type === "true-false") {
      updatedQuestion.trueFalseCorrectAnswer = formData.trueFalseCorrectAnswer;
    } else if (formData.type === "fill-in-blank") {
      updatedQuestion.fillInBlankAnswers = [
        {
          id: "blank1",
          correctAnswers: formData.fillInBlankAnswers.filter(
            (answer: string) => answer.trim() !== ""
          ),
        },
      ];
    }

    await client.updateQuestion(updatedQuestion);
    onSave();
  };

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Question Title"
            className="fw-bold"
            style={{ maxWidth: "300px" }}
          />
          <Form.Select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            style={{ maxWidth: "200px" }}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="fill-in-blank">Fill in the Blank</option>
          </Form.Select>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold">Pts:</span>
          <Form.Control
            type="number"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
            min="1"
            style={{ width: "80px" }}
          />
        </div>
      </div>

      {/* Question Details */}
      <div className="p-3">
        <Form>
          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Question:</Form.Label>
            <Editor
              value={formData.question}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, question: e.target.value }))
              }
              style={{ height: "6em" }}
            />
          </Form.Group>

          {/* Multiple Choice */}
          {formData.type === "multiple-choice" && (
            <Form.Group className="mb-3">
              <Form.Label>Choices</Form.Label>
              {formData.multipleChoiceOptions.map(
                (option: any, index: number) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="radio"
                      checked={option.isCorrect}
                      onChange={() => {
                        const newOptions = formData.multipleChoiceOptions.map(
                          (opt: any, i: number) => ({
                            ...opt,
                            isCorrect: i === index,
                          })
                        );
                        setFormData((prev) => ({
                          ...prev,
                          multipleChoiceOptions: newOptions,
                        }));
                      }}
                      className="me-2"
                    />
                    <Form.Control
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...formData.multipleChoiceOptions];
                        newOptions[index] = {
                          ...newOptions[index],
                          text: e.target.value,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          multipleChoiceOptions: newOptions,
                        }));
                      }}
                      placeholder={`Choice ${index + 1}`}
                      className="me-2"
                    />
                    {formData.multipleChoiceOptions.length > 2 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          const newOptions =
                            formData.multipleChoiceOptions.filter(
                              (_: any, i: number) => i !== index
                            );
                          setFormData((prev) => ({
                            ...prev,
                            multipleChoiceOptions: newOptions,
                          }));
                        }}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                )
              )}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  const newOption = {
                    id: `option${formData.multipleChoiceOptions.length + 1}`,
                    text: "",
                    isCorrect: false,
                  };
                  setFormData((prev) => ({
                    ...prev,
                    multipleChoiceOptions: [
                      ...prev.multipleChoiceOptions,
                      newOption,
                    ],
                  }));
                }}
                className="mt-2"
              >
                <FaPlus className="me-1" />
                Add Choice
              </Button>
            </Form.Group>
          )}

          {/* True/False */}
          {formData.type === "true-false" && (
            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  label="True"
                  checked={formData.trueFalseCorrectAnswer === true}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      trueFalseCorrectAnswer: true,
                    }))
                  }
                />
                <Form.Check
                  type="radio"
                  label="False"
                  checked={formData.trueFalseCorrectAnswer === false}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      trueFalseCorrectAnswer: false,
                    }))
                  }
                />
              </div>
            </Form.Group>
          )}

          {/* Fill in Blank */}
          {formData.type === "fill-in-blank" && (
            <Form.Group className="mb-3">
              <Form.Label>Possible Answers</Form.Label>
              {formData.fillInBlankAnswers.map((answer: any, index: number) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...formData.fillInBlankAnswers];
                      newAnswers[index] = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        fillInBlankAnswers: newAnswers,
                      }));
                    }}
                    placeholder={`Possible answer ${index + 1}`}
                    className="me-2"
                  />
                  {formData.fillInBlankAnswers.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        const newAnswers = formData.fillInBlankAnswers.filter(
                          (_: any, i: number) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          fillInBlankAnswers: newAnswers,
                        }));
                      }}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    fillInBlankAnswers: [...prev.fillInBlankAnswers, ""],
                  }));
                }}
                className="mt-2"
              >
                <FaPlus className="me-1" />
                Add Answer
              </Button>
              <Form.Text className="text-muted d-block mt-1">
                Answers are case insensitive
              </Form.Text>
            </Form.Group>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Update Question
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
