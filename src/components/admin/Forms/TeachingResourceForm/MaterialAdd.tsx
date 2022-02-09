import { useState } from "react";
import { getFileName } from "@/utils/images";
import { TeachingResourceMaterial } from "@/types/global";
import { DayPicker } from "@/components/admin/DayPicker";
import { UploadFileButton } from "@/components/admin/UploadFileButton";
import { isValidDescription, isValidDate } from "@/utils/validators";

interface MaterialAddProps {
  onAdd: (material: TeachingResourceMaterial) => void;
}

const DEFAULT_MATERIAL_INPUT: TeachingResourceMaterial = {
  name: "",
  date: "",
  host: "",
  link: "",
};

export const MaterialAdd: React.FC<MaterialAddProps> = ({ onAdd }) => {
  const [materialInput, setMaterialInput] = useState(DEFAULT_MATERIAL_INPUT);

  const updateMaterialInput =
    (
      key: keyof TeachingResourceMaterial
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      setMaterialInput((currentMaterialInput) => ({
        ...currentMaterialInput,
        [key]: event.target.value,
      }));
    };

  const updateMaterialInputImage = (imageName: string) => {
    setMaterialInput((currentMaterialInput) => ({
      ...currentMaterialInput,
      link: imageName,
    }));
  };

  const onClick = () => {
    onAdd(materialInput);
    setMaterialInput(DEFAULT_MATERIAL_INPUT);
  };

  return (
    <div className="flex items-center rounded border-b border-primary px-4 py-2 w-full">
      <div className="w-1/3">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none w-full"
          type="text"
          placeholder="Name"
          value={materialInput.name}
          onChange={updateMaterialInput("name")}
          aria-label="Resource name"
        />
      </div>

      <div className="w-1/5">
        <DayPicker
          className="border-none shadow-none w-32"
          placeholder="Date"
          value={materialInput.date}
          onChange={(newDate) => {
            console.log(newDate);
          }}
        />
      </div>

      <div className="w-1/5">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Host"
          value={materialInput.host}
          onChange={updateMaterialInput("host")}
          aria-label="Host"
        />
      </div>

      <div className="w-1/5 pl-2 pr-3">
        <UploadFileButton
          actionCopy={
            materialInput.link ? getFileName(materialInput.link) : "Add Link"
          }
          accept=".pdf"
          className="w-40 underline text-cyan-500 text-left truncate text-ellipsis"
          folder="files"
          onConfirm={updateMaterialInputImage}
        />
      </div>

      <button
        // className="btn-admin btn-sm bg-primary text-sm text-white py-1 px-4 rounded w-1/6"
        className="flex-shrink-0 btn-admin btn-primary btn-sm text-sm w-24"
        type="button"
        onClick={onClick}
      >
        Add
      </button>
    </div>
  );
};
