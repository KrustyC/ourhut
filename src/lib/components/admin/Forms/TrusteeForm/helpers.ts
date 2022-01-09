import { fetchJson } from "$lib/utils/fetch-json";

type TrusteeData = {
  name: string;
  description: Record<string, unknown>;
};

type CreateTrusteeOptions = {
  trusteeData: TrusteeData;
  token?: string;
};

export async function createTrustee({
  trusteeData,
  token,
}: CreateTrusteeOptions) {
  return fetchJson(`/admin-trustees`, {
    method: "POST",
    body: {
      trustee: trusteeData,
    },
    token,
  });
}

type UpdateTrusteeOptions = {
  id: string;
  trusteeData: TrusteeData;
  token?: string;
};

export async function updateTrustee({
  id,
  trusteeData,
  token,
}: UpdateTrusteeOptions) {
  return fetchJson(`/admin-trustees?id=${id}`, {
    method: "PUT",
    body: {
      trustee: trusteeData,
    },
    token,
  });
}
