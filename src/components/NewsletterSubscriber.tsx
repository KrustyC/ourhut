import { useState } from "react";
import Image from "next/image";
import { LoadingSpinner } from "./admin/LoadingSpinner";

export const NewsletterSubscriber = () => {
  const [displayEmailInput, setDisplayEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  const isEmailValid =
    email.length > 4 && email.includes("@") && email.includes(".");

  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onDisplayEmailInput = () => {
    setDisplayEmailInput(true);
  };

  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onSubscribe = () => {
    setPending(true);

    setTimeout(() => {
      setPending(false);
      setSuccess(true);
    }, 3000);
    console.log("SUBSCRIBE", email);
  };

  if (success) {
    return (
      <div className="mb-4 flex flex-col">
        <Image
          width="150px"
          height="100px"
          objectFit="contain"
          alt="dynosaur"
          src="/images/dynosaur.jpg"
        />

        <span className="text-black font-semibold text-m">
          Thank you! You will hear from us soon!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span className="text-black font-medium text-xl mb-1">
        Subscribe to our newsletter
      </span>

      <div className="h-12 mb-4 flex items-center">
        {!displayEmailInput ? (
          <span
            className="text-primary underline font-semibold text-xl underline"
            role="button"
            onClick={onDisplayEmailInput}
          >
            Enter your email address
          </span>
        ) : (
          <input
            type="text"
            className="h-full w-full  form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={email}
            onChange={onChangeEmail}
          />
        )}
      </div>

      <div>
        <button
          disabled={pending || !isEmailValid}
          className="btn btn-transparent-outlined font-bold w-40 text-black"
          onClick={onSubscribe}
        >
          {pending ? <LoadingSpinner color="bg-primary" /> : "Subscribe"}
        </button>
      </div>
    </div>
  );
};
