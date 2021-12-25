import { variables } from "$lib/variables";

export async function saveEvent(event) {
  const url = `${variables.basePath}/.netlify/functions/admin-projects`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      event,
    }),
  });

  // const json = await res.json();
  // success = true;

  // setTimeout(() => {
  //   success = false;
  // }, 4000);
}
