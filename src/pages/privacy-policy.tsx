import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";

const PrivacyPolicyPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Privacy Policy | Our Hut</title>
        <meta name="description" content="Privacy Policy for Our Hut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white pb-32">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-black",
            logoColor: "fill-primary",
          }}
        />

        <div className="mt-4">
          <h1 className="text-3xl md:text-6xl text-black font-bold ml-8 lg:ml-24">
            Privacy Policy
          </h1>
          <div className="flex flex-col items-start lg:items-center text-black mt-8 lg:mt-16">
            <div className="w-full px-8 md:w-4/5 lg:w-2/3 xl:w-1/2 text-left font-medium">
              <p>Our Hut takes your privacy and security very seriously.</p>

              <p className="mt-8">
                This Privacy Policy applies to information we, our Hut, collect
                about individuals who interact with our organisation. It
                explains what personal information we collect and how we use it.
              </p>

              <p className="mt-8">
                If you have any comments or questions about this notice, feel
                free to contact us at ourhut@hotmail.com
              </p>

              <ol className="mt-8">
                <li className="flex flex-col">
                  <span className="font-bold">
                    .1 Personal data that we process
                  </span>
                  <p>
                    We only collect and process personal data for our mailing
                    list. The data we collect consists of name and email
                    address. The purpose for this is to be able to send out news
                    and updates. about Our Hut{"'"}s work and events. The legal
                    basis on which we process this data is consent. All people
                    whose data we hold on our mailing list will have actively
                    given their consent.
                  </p>
                </li>

                <li className="flex flex-col mt-8">
                  <span className="font-bold">2. How we use your data</span>
                  <p>
                    We will only use your data to send you communications about
                    our work and events which we think may be of interest to
                    you.
                  </p>
                </li>

                <li className="flex flex-col mt-8">
                  <span className="font-bold">3. When we share your data</span>
                  <p>
                    We will NEVER sell your data or pass it to a third party
                    except in the following circumstances:
                    <ul className="list-disc pl-8 mt-4">
                      <li>
                        we are using a third party purely for the purposes of
                        processing data on our behalf and we have in place a
                        data processing agreement with that third party that
                        fulfils our legal obligations in relation to the use of
                        third party data processors {`–`} our mailing list is
                        shared with mailchimp for the purpose of sending out our
                        news emails
                      </li>
                      <li className="mt-4">
                        we are required by law to share your data.
                      </li>
                    </ul>
                  </p>
                </li>

                <li className="flex flex-col mt-8">
                  <span className="font-bold">
                    4. How long we keep your data
                  </span>
                  <p>
                    As we only store the minimum amount of personal data for the
                    purposes of our mailing list we keep the data as long as you
                    are happy for us to do so. You have the right at any time to
                    unsubscribe from our list or ask us to remove your data.
                  </p>
                </li>

                <li className="flex flex-col mt-8">
                  <span className="font-bold">
                    5. Rights you have over your data
                  </span>
                  <div>
                    You have a range of rights over your data, which include the
                    following:
                    <ul className="list-disc pl-8 mt-4">
                      <li>
                        Where data processing is based on consent, you may
                        revoke this consent at any time and we will make it as
                        easy as possible for you to do this {`–`} you can
                        unsubscribe using the link at the bottom of our emails
                        or you can contact us and ask us to delete your data
                        from our mailing list.
                      </li>
                      <li className="mt-4">
                        You have the right to ask for rectification and/or
                        deletion of your information.
                      </li>
                      <li className="mt-4">
                        You have the right of access to your information.
                      </li>
                      <li className="mt-4">
                        You have the right to lodge a complaint with the
                        Information Commissioner if you feel your rights have
                        been infringed.
                      </li>
                    </ul>
                    <p className="mt-4">
                      A full summary of your legal rights over your data can be
                      found on the Information Commissioner{"'"}s website here:{" "}
                      <a className="text-primary" href="https://ico.org.uk">
                        https://ico.org.uk
                      </a>
                    </p>
                    <p className="mt-4">
                      If you would like to access the rights listed above, or
                      any other legal rights you have over your data under
                      current legislation, please get in touch with us at
                      ourhut@hotmail.com
                    </p>
                  </div>
                </li>

                <li className="flex flex-col mt-8">
                  <span className="font-bold">6. Cookies & usage tracking</span>
                  <p>We do not use cookies or track usage of our website.</p>
                </li>

                <li className="flex flex-col mt-8">
                  <span className="font-bold">7. Modifications</span>
                  <p>
                    We may modify this Privacy Policy from time to time and will
                    publish the most current version on our website.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
