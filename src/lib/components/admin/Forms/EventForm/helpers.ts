import { variables } from "$lib/variables";

export async function createEvent(event, status: "draft" | "published") {
  const url = `${variables.basePath}/.netlify/functions/admin-events`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      event,
      status,
    }),
  });

  const json = await res.json();

  // setTimeout(() => {
  //   success = false;
  // }, 4000);
}

export async function updateEvent(
  slug: string,
  event,
  status: "draft" | "published"
) {
  const url = `${variables.basePath}/.netlify/functions/admin-events?slug=${slug}`;

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      event,
      status,
    }),
  });

  const json = await res.json();

  // setTimeout(() => {
  //   success = false;
  // }, 4000);
}
