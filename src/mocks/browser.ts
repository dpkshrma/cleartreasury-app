import { setupWorker } from "msw";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";
import { verifyHandlers } from "./handlers/verifyHandlers";
import { beneficiaryHandlers } from "./handlers/beneficiaryHandlers";
import { tradeHandlers } from "./trades/mutations";

export const worker = setupWorker(
  ...clientHandlers,
  ...quoteHandlers,
  ...verifyHandlers,
  ...beneficiaryHandlers,
  ...tradeHandlers
);
