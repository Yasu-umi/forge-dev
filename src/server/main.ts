import { app } from "./app";
import * as env from "./env";

app.listen(env.PORT, () => console.log(`Server listening on port ${env.PORT}`));
