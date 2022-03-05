import { parse, format } from "date-fns";
import { TeachingResourceMaterial } from "@/types/global";
import { ResourceLink } from "./ResourceLink";

function formatDate(date: string) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd-MM-yyyy");
}

interface ResourcesListMobileProps {
  materials: TeachingResourceMaterial[];
}

export const ResourcesListMobile: React.FC<ResourcesListMobileProps> = ({
  materials,
}) => (
  <div className="border-t-2 border-black">
    {materials.map((material, i) => (
      <div key={i} className="flex flex-col py-4 border-b-2 border-black">
        <div className="flex items-center">
          <div className="w-5/12 text-sm">Name of material</div>
          <div className="w-7/12 font-semibold">{material.name}</div>
        </div>

        <div className="flex">
          <div className="w-5/12 text-sm">Date published</div>
          <div className="w-7/12">{formatDate(material.date)}</div>
        </div>

        <div className="flex">
          <div className="w-5/12 text-sm">Host</div>
          <div className="w-7/12 overflow-hidden truncate text-ellipsis">
            {material.host}
          </div>
        </div>

        <div className="flex">
          <div className="w-5/12 text-sm">Link</div>
          <div className="w-7/12 overflow-hidden truncate text-ellipsis">
            <ResourceLink link={material.link} />
          </div>
        </div>
      </div>
    ))}
  </div>
);
