import { setupWorker } from "msw";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";
import { tradeHandlers } from "./trades/mutations";

export const worker = setupWorker(
  ...clientHandlers,
  ...quoteHandlers,
  ...tradeHandlers
);
