import { setupWorker, rest } from "msw";
import { clientHandlers } from "./handlers/clientHandlers";
import { quoteHandlers } from "./handlers/quoteHandlers";
import { verifyHandlers } from "./handlers/verifyHandlers";
import { beneficiaryHandlers } from "./handlers/beneficiaryHandlers";
import { tradeHandlers } from "./handlers/tradeHandlers";

declare global {
  interface Window {
    msw: any;
  }
}

export const worker = setupWorker(
  ...clientHandlers,
  ...quoteHandlers,
  ...verifyHandlers,
  ...beneficiaryHandlers,
  ...tradeHandlers
);

window.msw = {
  worker,
  rest,
};
