import { NewsletterSubscriber } from "@/components/NewsletterSubscriber";
import { useSubscribeToNewsletter } from "@/hooks/useNewsletterSubscriber";

export const DesktopContacts = () => {
  const { success, pending, hasError, onSubscribe } =
    useSubscribeToNewsletter();

  return (
    <div className="flex grow w-fit mx-auto">
      <div className="w-[620px] aspect-square bg-primary p-12">
        {!success ? (
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex flex-col gap-5 text-white">
              <h2 className="text-5xl">
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

      <div className="w-2/5 bg-gray-100 p-12 flex flex-col gap-8 text-black">
        <p className="font-bold text-xl leading-7">
          Our Hut
          <br />
          Registered Charity
          <br />
          1138408
          <br />
        </p>

        <p className="font-medium text-2xl leading-8">
          Lucy Lavers
          <br />
          Suzanna Prizeman
          <br />
          Judy Ovens
          <br />
        </p>

        <div className="flex flex-col font-medium text-sm">
          <a className="text-black" href="mailto:ourhutteam@ourhut.co.uk">
            ourhutteam@ourhut.co.uk
          </a>
        </div>
      </div>
    </div>
  );
};
