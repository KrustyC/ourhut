export const GuardianNews: React.FC = () => (
  <div className="flex">
    <div className="w-1/2">
      <img
        src="https://i.guim.co.uk/img/media/00d4d57a15c927716808df0bc21ea28df91970b2/0_177_3329_2121/master/3329.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=d7d20c67135dc64dd6253b005e3092a0"
        className="w-full"
      />
    </div>

    <div className="w-1/2 pl-8">
      <h2 className="text-black font-bold">
        Where there&apos;s a grille: the hidden portals to London&apos;s
        underworld
      </h2>

      <p>Oliver Wainwright - Tue 29 Jun 2021 10.01 BST</p>

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
