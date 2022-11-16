import { wrap } from "svelte-spa-router/wrap";

import Watch from "./routes/watch.svelte";

export default {
  "/dash": wrap({
    asyncComponent: () => import("./routes/dash.svelte"),
  }),
  "/:id?": Watch,
};
