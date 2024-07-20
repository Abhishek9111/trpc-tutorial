import { publicProcedure, router } from "./trpc";

import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});
const appRouter = router({
  // ...

  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;
    const username = opts.ctx.username;
    console.log("username", username);

    return {
      id: "1",
    };
  }),

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      let email = opts.input.email;
      let password = opts.input.password;
      //do db stuff and generate token
      let token = "123123";
      return { token };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log("authHeader", authHeader);

    //jwt verify, check header, return username then
    return {
      username: "test",
    };
  },
});

server.listen(3000);
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
