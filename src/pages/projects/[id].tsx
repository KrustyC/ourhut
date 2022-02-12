// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://.../posts");
//   const posts = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   };
// }

import Head from "next/head";
import { Navbar } from "@/components/Navbar";

const ProjectPage = () => (
  <div>
    <Head>
      <title>Project | Our Hut</title>
      <meta name="description" content="Get in touch" />
    </Head>

    <div className="h-screen bg-white flex flex-col">
      <Navbar
        config={{
          burgerColor: "bg-primary",
          textColor: "fill-black",
          logoColor: "fill-primary",
        }}
      />

      <div>PROJECT</div>
    </div>
  </div>
);

export default ProjectPage;
