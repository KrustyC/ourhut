import { variables } from "$lib/variables";

export type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string;
  body?: Record<string, unknown>;
};

export async function fetchJson(
  path: string,
  { method = "GET", token, body }: Options
) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${variables.basePath}/.netlify/functions${path}`;

  const options = {
    method,
    headers,
  };

  if (body) {
    options["body"] = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (res.status !== 200) {
    throw new Error("Error fetching data");
  }

  return res.json();
}
