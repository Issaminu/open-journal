import { ourFileRouter } from "./core";
import { createNextRouteHandler } from "uploadthing/server";

export const { POST } = createNextRouteHandler({
  router: ourFileRouter,
});
