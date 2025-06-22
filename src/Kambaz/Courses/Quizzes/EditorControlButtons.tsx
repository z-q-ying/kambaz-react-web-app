import { Button } from "react-bootstrap";

export default function EditorControlButtons({
  onCancel,
  onSave,
  onSaveAndPublish,
  showSaveAndPublish = true,
}: {
  readonly onCancel: () => void;
  readonly onSave: () => void;
  readonly onSaveAndPublish?: () => void;
  readonly showSaveAndPublish?: boolean;
}) {
  return (
    <div className="d-flex justify-content-end gap-2 mt-4">
      <Button variant="secondary" size="lg" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="danger" size="lg" onClick={onSave}>
        Save
      </Button>
      {showSaveAndPublish && onSaveAndPublish && (
        <Button variant="success" size="lg" onClick={onSaveAndPublish}>
          Save & Publish
        </Button>
      )}
    </div>
  );
}
