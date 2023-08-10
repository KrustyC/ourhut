import { LoadingSpinner } from "./admin/LoadingSpinner";
import { useForm } from "react-hook-form";

interface NewsletterData {
  email: string;
  firstName: string;
  lastName: string;
}

interface NewsletterSubscriberProps {
  pending: boolean;
  onSubscribe: (newsletterData: NewsletterData) => void;
}

export const NewsletterSubscriber: React.FC<NewsletterSubscriberProps> = ({
  pending,
  onSubscribe,
}) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<NewsletterData>({
    defaultValues: { email: "", firstName: "", lastName: "" },
    mode: "onBlur",
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubscribe)}>
      <div className="flex lg:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <input
            autoFocus
            className="newsletter-input"
            type="text"
            {...register("firstName", {
              required: "Please enter a first name",
            })}
            placeholder="First name"
          />

          {errors.firstName && (
            <span className="newsletter-input-error">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <input
            className="newsletter-input"
            type="text"
            {...register("lastName", { required: "Please enter a last name" })}
            placeholder="Last name"
          />

          {errors.lastName && (
            <span className="newsletter-input-error">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <input
          className="newsletter-input"
          type="email"
          {...register("email", { required: "Please enter a valid email" })}
          placeholder="Email address"
        />
        {errors.email && (
          <span className="newsletter-input-error">{errors.email.message}</span>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={pending || !isDirty}
          className="btn btn-transparent-outlined-white transparent-outlined font-bold h-14 w-full text-black"
        >
          {pending ? <LoadingSpinner color="bg-white" /> : "Subscribe"}
        </button>
      </div>
    </form>
  );
};
