import { useState } from "react";
import { LoadingSpinner } from "./admin/LoadingSpinner";

export const useSubscribeToNewsletter = () => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubscribe = (email: string) => {
    console.log(email);
    setPending(true);

    setTimeout(() => {
      setPending(false);
      setSuccess(true);
    }, 1500);
  };

  return {
    pending,
    success,
    onSubscribe,
  };
};

interface NewsletterSubscriberProps {
  pending: boolean;
  onSubscribe: (email: string) => void;
}

export const NewsletterSubscriber: React.FC<NewsletterSubscriberProps> = ({
  pending,
  onSubscribe,
}) => {
  const [email, setEmail] = useState("");

  const isEmailValid =
    email.length > 4 && email.includes("@") && email.includes(".");

  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        autoFocus
        placeholder="Enter your email address"
        type="text"
        className="h-14 mb-6 w-full appearance-none bg-white text-gray-700 px-6 leading-tight focus:outline-none"
        value={email}
        onChange={onChangeEmail}
      />

      <div>
        <button
          disabled={pending || !isEmailValid}
          className="btn btn-transparent-outlined-white transparent-outlined font-bold h-14 w-full text-black"
          onClick={() => onSubscribe(email)}
        >
          {pending ? <LoadingSpinner color="bg-primary" /> : "Subscribe"}
        </button>
      </div>
    </div>
  );
};
