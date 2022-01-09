import { fetchJson } from "$lib/utils/fetch-json";

type SchoolData = {
  name: string;
  postcode: string;
};

type CreateSchoolOptions = {
  schoolData: SchoolData;
  token?: string;
};

export async function createSchool({ schoolData, token }: CreateSchoolOptions) {
  return fetchJson(`/admin-schools`, {
    method: "POST",
    body: {
      school: schoolData,
    },
    token,
  });
}

type UpdateSchoolOptions = {
  id: string;
  schoolData: SchoolData;
  token?: string;
};

export async function updateSchool({
  id,
  schoolData,
  token,
}: UpdateSchoolOptions) {
  return fetchJson(`/admin-schools?id=${id}`, {
    method: "PUT",
    body: {
      school: schoolData,
    },
    token,
  });
}
