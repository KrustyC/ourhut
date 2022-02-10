import Image from "next/image";

export const GuardianNews: React.FC = () => (
  <div className="flex">
    <div className="w-1/2 h-[450px] relative">
      <Image layout="fill" alt="vent" src="/images/guardian.jpg" />
    </div>

    <div className="w-1/2 pl-8">
      <h2 className="text-black font-bold">
        Where there&apos;s a grille: the hidden portals to London&apos;s
        underworld
      </h2>

      <p className="pt-2">Oliver Wainwright - Tue 29 Jun 2021 10.01 BST</p>

      <p className="mt-6 mb-4">
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
