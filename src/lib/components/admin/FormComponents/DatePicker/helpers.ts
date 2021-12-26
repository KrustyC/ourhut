import { parse } from "date-fns";

export function parseDate(date: string | undefined): Date | undefined {
  if (!date) {
    return undefined;
  }

  return parse(date, "dd/MM/yyyy", new Date());
}
