import { ActionFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";

const RequestBodySchema = z.object({
  conversation_id: z.string(),
  query: z.string()
});

export type RequestBody = z.infer<typeof RequestBodySchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    if (request.method === "GET") {
      return json({ ok: true });
    } else {
      return json({ message: "Method not allowed." }, { status: 405 });
    }
  } catch (error) {
    console.log(error);
    return json({ message: "Something went wrong..." }, { status: 500 });
  }
};
