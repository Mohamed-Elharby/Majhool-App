import { z } from "zod";
import { AppEroor } from "../../pkg/error/customError.js";

export function validateDTO(dto, body) {
  const result = z.safeParse(dto, body);
  if (!result.success) {
    const errorMessage = result.error.issues.map((issues) => {
      return ` ${issues.path[0]}: ${issues.message}`;
    });
    throw new AppEroor(errorMessage, 400);
  }
  return result.data;
}
