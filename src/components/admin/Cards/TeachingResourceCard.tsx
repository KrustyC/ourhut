import { TeachingResource } from "@/types/global";

interface TeachingResourceCardProps {
  teachingResource: TeachingResource;
  onWantToRemoveTeachingResource: VoidFunction;
}

export const TeachingResourceCard: React.FC<TeachingResourceCardProps> = ({
  teachingResource,
  onWantToRemoveTeachingResource,
}) => (
  <div className="bg-white shadow rounded-lg p-4 ">
    <div className="flex flex-col">
      <span className="text-xl font-bold text-gray-900">
        {teachingResource.title}
      </span>

      <div className="flex items-end mr-4 mb-2 text-sm text-gray-600">
        {teachingResource.materials.length} materials
      </div>
    </div>
  </div>
);
