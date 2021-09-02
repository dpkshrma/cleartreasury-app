import { setupWorker } from "msw";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";

export const worker = setupWorker(...clientHandlers, ...quoteHandlers);
