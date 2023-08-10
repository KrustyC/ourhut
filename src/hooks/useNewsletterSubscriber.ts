import { useState } from "react";
import { REST_METHOD } from "@/types/global";
import { fetchJson } from "@/utils/fetch-json";

interface NewsletterData {
  email: string;
  firstName: string;
  lastName: string;
}

export const useSubscribeToNewsletter = () => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const onSubscribe = async (newsletterData: NewsletterData) => {
    setHasError(false);
    setPending(true);

    try {
      const url = `${process.env.baseUrl}/.netlify/functions/newsletter`;
      const options = {
        method: REST_METHOD.POST,
        body: newsletterData,
      };

      await fetchJson<unknown>(url, options);

      setSuccess(true);
    } catch (error) {
      setHasError(true);
    }

    setPending(false);
  };

  return {
    pending,
    success,
    hasError,
    onSubscribe,
  };
};
