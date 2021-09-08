import { setupServer } from "msw/node";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";
import { verifyHandlers } from "./handlers/verifyHandlers";
import { beneficiaryHandlers } from "./handlers/beneficiaryHandlers";
import { tradeHandlers } from "./handlers/tradeHandlers";

// Setup requests interception using the given handlers.
export const server = setupServer(
  ...clientHandlers,
  ...quoteHandlers,
  ...verifyHandlers,
  ...beneficiaryHandlers,
  ...tradeHandlers
);
