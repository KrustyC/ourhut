import { NewsletterSubscriber } from "@/components/NewsletterSubscriber";
import { useSubscribeToNewsletter } from "@/hooks/useNewsletterSubscriber";

export const MobileContacts = () => {
  const { success, pending, hasError, onSubscribe } =
    useSubscribeToNewsletter();

  return (
    <div className="flex flex-col">
      <div className="w-full bg-primary px-6 py-12">
        {!success ? (
          <div className="flex flex-col justify-between gap-8 text-white">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl">
                Subscribe to <br /> our Newsletter
              </h2>
              <p>
                Keep informed about Our Hut{"'"}s important updates. By
                subscribing to our newsletter, you{"'"}ll receive information on
                upcoming workshops, tours, and events. Join us and stay
                connected with the architectural community
              </p>
            </div>
            <NewsletterSubscriber
              pending={pending}
              hasSubmitError={hasError}
              onSubscribe={onSubscribe}
            />
          </div>
        ) : (
          <div className="h-full w-full flex items-center">
            <h2 className="text-4xl text-white w-4/5">
              Thank you for subscribing! We will keep you updated.
            </h2>
          </div>
        )}
      </div>

      <div className="w-full bg-gray-100 px-6 py-12">
        <div className="w-full pl-6 flex flex-col gap-6 text-black border-l-2 border-primary">
          <p className="font-bold text-xl leading-7">
            Our Hut
            <br />
            Registered Charity
            <br />
            1138408
          </p>

          <p className="font-medium text-xl leading-7">
            Lucy Lavers
            <br />
            Suzanna Prizeman
            <br />
            Judy Ovens
          </p>

          <div className="flex flex-col font-medium text-regular">
            <a className="text-black" href="mailto:ourhutteam@ourhut.co.uk">
              ourhutteam@ourhut.co.uk
            </a>
            <span>0044 (0)7745123458</span>
          </div>
        </div>
      </div>
    </div>
  );
};
