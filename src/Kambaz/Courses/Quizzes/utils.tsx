import { formatDateTime } from "../../../utils/dateUtils";

export function calculateAvailabilityStatus(
  availableDate?: string,
  availableUntilDate?: string
): React.ReactElement {
  const now = new Date();
  const available = availableDate ? new Date(availableDate) : null;
  const availableUntil = availableUntilDate
    ? new Date(availableUntilDate)
    : null;

  if (availableUntil && now > availableUntil) {
    return <b>Closed</b>;
  }
  if (available && now < available) {
    return (
      <>
        <b>Not available until</b> {formatDateTime(available)}
      </>
    );
  }
  if (availableUntil && now <= availableUntil) {
    return (
      <>
        <b>Available until</b> {formatDateTime(availableUntil)}
      </>
    );
  }

  // Default: Available (no specific dates provided)
  return <b>Available</b>;
}
