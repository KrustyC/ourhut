import { parse, format } from "date-fns";
import { PublicationMaterial } from "@/types/global";
import { ResourceLink } from "./ResourceLink";

function formatDate(date: string) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd-MM-yyyy");
}

interface ResourcesListDesktopProps {
  materials: PublicationMaterial[];
}

export const ResourcesListDesktop: React.FC<ResourcesListDesktopProps> = ({
  materials,
}) => (
  <table className="w-full table-fixed">
    <thead>
      <tr className="w-1/2 text-left text-sm border-b-2 border-black">
        <th className="w-5/12 pb-1 px-2">Name of material</th>
        <th className="w-2/12 pb-1 px-2">Type</th>
        <th className="w-2/12 pb-1 px-2">Date Published</th>
        <th className="w-2/12 pb-1 px-2">Author/Interviewees</th>
        <th className="w-1/12 pb-1 px-2">Link</th>
      </tr>
    </thead>

    <tbody>
      {materials.map((material, i) => (
        <tr key={i} className="py-20 border-b-2 border-black">
          <td className="w-5/12  py-4 truncate text-ellipsis font-semibold px-2">
            {material.name}
          </td>
          <td className="w-2/12 py-4 overflow-hidden truncate text-ellipsis px-2">
            {material.type}
          </td>
          <td className="w-2/12 py-4 px-2">{formatDate(material.date)}</td>
          <td className="w-2/12 py-4 px-2">{material.authorOrInterviewees}</td>
          <td className="w-1/12 py-4 px-2">
            <ResourceLink link={material.link} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
