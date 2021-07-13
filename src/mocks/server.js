import { setupServer } from "msw/node";
import { clientHandlers } from "./handlers/clientHandlers";

// Setup requests interception using the given handlers.
export const server = setupServer(...clientHandlers);
