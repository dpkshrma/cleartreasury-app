import { setupServer } from "msw/node";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";

// Setup requests interception using the given handlers.
export const server = setupServer(...clientHandlers, ...quoteHandlers);
