import Image from "next/image";

export const GuardianNews: React.FC = () => (
  <div className="flex flex-col md:flex-row">
    <div className="md:w-1/2 h-[300px] md:h-[450px] relative">
      <Image layout="fill" alt="vent" src="/images/guardian.jpg" />
    </div>

    <div className="mt-6 md:mt-0 md:w-1/2 md:pl-8">
      <h3 className="text-black">
        Where there&apos;s a grille: the hidden portals to London&apos;s
        underworld
      </h3>

      <p className="text-sm md:text-xl pt-2">
        Oliver Wainwright - Tue 29 Jun 2021 10.01 BST
      </p>

      <p className="my-6">
        The Sublime Structures in Crystal Palace Park Project, devised and run
        by Our Hut, aimed to enable local young peopleand families to discover
        and celebrate the extraordinary legacy of design and engineering...
      </p>

      <a
        className="uppercase text-black underline underline-offset-1"
        href="https://www.theguardian.com/artanddesign/2021/jun/29/inventive-vents-london-flues-grilles-our-hut"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read full article
      </a>
    </div>
  </div>
);
