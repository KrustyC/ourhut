import { useState, useRef } from "react";
import Image from "next/image";
import { parse, format } from "date-fns";
import { TeachingResource } from "@/types/global";
import { UpArrowIcon } from "@/components/icons/UpArrow";

interface TeacherResourcePanelProps {
  teachingResource: TeachingResource;
}

function formatDate(date: string) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd-MM-yyyy");
}

export const TeacherResourcePanel: React.FC<TeacherResourcePanelProps> = ({
  teachingResource,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const onToggle = () => {
    if (!isOpen && panelRef.current) {
      panelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }

    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div
      ref={panelRef}
      key={teachingResource._id}
      className="flex flex-col w-full px-12 py-12 mb-8"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-4xl text-black font-bold">
          {teachingResource.title}
        </h3>
        <span>
          <UpArrowIcon
            className={`h-8 w-8 cursor-pointer transition-all duration-500 fill-black ${
              !isOpen ? "rotate-180" : ""
            }`}
            onClick={onToggle}
          />
        </span>
      </div>

      {isOpen ? (
        <>
          <div className="relative h-60 w-full mt-8 mb-8">
            <Image
              src={teachingResource.image}
              alt={teachingResource.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="w-1/2 text-left text-sm border-b-2 border-black">
                <th className="w-1/2 pb-1 px-2">Name of material</th>
                <th className="w-1/6 pb-1 px-2">Date Published</th>
                <th className="w-1/4 pb-1 px-2">Host</th>
                <th className="w-1/12 pb-1 px-2">Link</th>
              </tr>
            </thead>

            <tbody>
              {teachingResource.materials.map((material, i) => (
                <tr key={i} className="py-20 border-b-2 border-black">
                  <td className="w-1/2  py-4 truncate text-ellipsis font-semibold px-2">
                    {material.name}
                  </td>
                  <td className="w-1/6 py-4 px-2">
                    {formatDate(material.date)}
                  </td>
                  <td className="w-1/4 py-4 overflow-hidden truncate text-ellipsis px-2">
                    {material.host}
                  </td>
                  <td className="w-1/12 py-4 px-2">1961</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};
