import { fetchJson } from "$lib/utils/fetch-json";

type CreateEventOptions = {
  eventData: any;
  status: "draft" | "published";
  token?: string;
};

export async function createEvent({
  eventData,
  status,
  token,
}: CreateEventOptions) {
  return fetchJson(`/admin-events`, {
    method: "POST",
    body: {
      event: eventData,
      status,
    },
    token,
  });
}

type UpdateEventOptions = {
  slug: string;
  eventData: any;
  status: "draft" | "published";
  token?: string;
};

export async function updateEvent({
  slug,
  eventData,
  status,
  token,
}: UpdateEventOptions) {
  return fetchJson(`/admin-events?slug=${slug}`, {
    method: "PUT",
    body: {
      event: eventData,
      status,
    },
    token,
  });
}
