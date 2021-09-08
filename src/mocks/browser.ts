import { setupWorker } from "msw";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";
import { verifyHandlers } from "./handlers/verifyHandlers";
import { beneficiaryHandlers } from "./handlers/beneficiaryHandlers";
import { tradeHandlers } from "./handlers/tradeHandlers";

export const worker = setupWorker(
  ...clientHandlers,
  ...quoteHandlers,
  ...verifyHandlers,
  ...beneficiaryHandlers,
  ...tradeHandlers
);
