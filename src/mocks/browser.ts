import { setupWorker } from "msw";
import { clientHandlers } from "./handlers/clientHandlers";

export const worker = setupWorker(...clientHandlers);
