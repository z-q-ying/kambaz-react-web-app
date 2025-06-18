// Helper: Convert date fields to strings for Redux
const convertDatesToStrings = (
  obj: any,
  dateFields: string[] = ["startDate", "endDate", "dob"]
): any => {
  if (!obj) return obj;

  const result = { ...obj };
  dateFields.forEach((field) => {
    if (result[field]) {
      result[field] = formatDateForInput(result[field]);
    }
  });
  return result;
};

// Helper: Process array of objects, convert date fields to strings
const convertArrayDatesToStrings = (
  array: any[],
  dateFields: string[] = ["startDate", "endDate", "dob"]
): any[] => {
  return array.map((item) => convertDatesToStrings(item, dateFields));
};

// Format date for HTML input[type="date"]
export const formatDateForInput = (date: any): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

// Store data from server in Redux
export const prepareForRedux = (data: any, dateFields?: string[]) =>
  convertDatesToStrings(data, dateFields);

// Store array of date from server in Redux
export const prepareArrayForRedux = (array: any[], dateFields?: string[]) =>
  convertArrayDatesToStrings(array, dateFields);
