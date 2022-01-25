import { Event } from "@/types/global";

interface PartEventCardProps {
  event: Event;
}

export const PastEventCard: React.FC<PartEventCardProps> = () => (
  <div className="cursor-pointer w-full h-72 bg-red-100 relative">
    <img
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/en/3/3c/JumanjiTheNextLevelTeaserPoster.jpg')",
      }}
    />
    <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold">
      Dwayne
    </div>
  </div>
);
