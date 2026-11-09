import { handleApi } from "../../server/index";
import type { Env } from "../../server/types";
export const onRequest: PagesFunction<Env> = (context) =>
  handleApi({
    request: context.request as unknown as Request,
    env: context.env,
    waitUntil: context.waitUntil.bind(context),
  });
