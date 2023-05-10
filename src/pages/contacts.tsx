import Head from "next/head";
import { Media } from "@/components/Media";
import { Navbar } from "@/components/Navbar";
import { DesktopContacts } from "@/components/DesktopContacts";
import { MobileContacts } from "@/components/MobileContacts";

const ContactsPage = () => (
  <div>
    <Head>
      <title>Contacts | Our Hut</title>
      <meta
        name="description"
        content="Would you like to get in touch with us? Use this form and we will try to get back to you as soon as possible."
      />
    </Head>
    <div>
      <Media lessThan="md">
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
          <Navbar
            config={{
              burgerColor: "bg-primary",
              textColor: "fill-black",
              logoColor: "fill-primary",
            }}
          />
          <MobileContacts />
        </div>
      </Media>

      <Media greaterThanOrEqual="md">
        <div className="xl:h-screen bg-white flex flex-col">
          <Navbar
            config={{
              burgerColor: "bg-primary",
              textColor: "fill-black",
              logoColor: "fill-primary",
            }}
          />
          <DesktopContacts />
        </div>
      </Media>
    </div>
  </div>
);

export default ContactsPage;
