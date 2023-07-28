import {
  useSubscribeToNewsletter,
  NewsletterSubscriber,
} from "@/components/NewsletterSubscriber";

export const MobileContacts = () => {
  const { success, pending, onSubscribe } = useSubscribeToNewsletter();

  return (
    <div className="flex flex-col">
      <div className="w-full bg-primary p-6">
        {!success ? (
          <div className="flex flex-col justify-between gap-8 text-white">
            <h2 className="text-4xl">
              Subscribe to <br /> our Newsletter
            </h2>
            <p>
              Keep informed about Our Hut's important updates. By subscribing to
              our newsletter, you'll receive information on upcoming workshops,
              tours, and events. Join us and stay connected with the
              architectural community
            </p>

            <NewsletterSubscriber pending={pending} onSubscribe={onSubscribe} />
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
        <div className="w-full pl-8 flex flex-col gap-8 text-black border-l-2 border-primary">
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
            <span className="mt-2">0044 (0)7745123458</span>
          </div>
        </div>
      </div>
    </div>
  );
};
