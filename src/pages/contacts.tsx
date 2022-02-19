import Head from "next/head";
import { Media } from "@/components/Media";
import { Navbar } from "@/components/Navbar";
import { DesktopContacts } from "@/components/DesktopContacts";
import { MobileContacts } from "@/components/MobileContacts";

const ContactsPage = () => (
  <div>
    <Head>
      <title>Contacts | Our Hut</title>
      <meta name="description" content="Get in touch" />
    </Head>
    <div>
      <Media lessThan="md">
        <div className="bg-[#F5F5F5] flex flex-col">
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
        <div className="h-screen bg-white flex flex-col">
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
