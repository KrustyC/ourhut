import { useState } from "react";
import { Controller, UseFormRegister, Control } from "react-hook-form";
import { getFileName } from "@/utils/images";
import { TeachingResourceMaterial } from "@/types/global";
import { DayPicker } from "@/components/admin/DayPicker";
import { UploadFileButton } from "@/components/admin/UploadFileButton";
import { isValidDate } from "@/utils/validators";

interface MaterialInputProps {
  name: string;
  control: Control;
  register: UseFormRegister<any>;
  onRemove: VoidFunction;
}

const DEFAULT_MATERIAL_INPUT: TeachingResourceMaterial = {
  name: "",
  date: "",
  host: "",
  link: "",
};

export const MaterialInput: React.FC<MaterialInputProps> = ({
  name,
  register,
  control,
  onRemove,
}) => {
  return (
    <div className="flex items-center rounded border-b border-slate-500 px-4 py-2 w-full">
      <div className="w-1/3">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none w-full"
          type="text"
          placeholder="Name"
          {...register(`${name}.name`)}
          aria-label="Resource name"
        />
      </div>

      <div className="w-1/5">
        <Controller
          name={`${name}.date`}
          rules={{ required: true, validate: isValidDate }}
          control={control}
          render={(props) => (
            <DayPicker
              className="border-none shadow-none w-32"
              placeholder="Date"
              value={props.field.value}
              onChange={(newDate) => {
                props.field.onChange(newDate);
                props.field.onBlur();
              }}
            />
          )}
        />
      </div>

      <div className="w-1/5">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Host"
          {...register(`${name}.host`)}
          aria-label="Host"
        />
      </div>

      <div className="w-1/5 pl-2 pr-3">
        <Controller
          name={`${name}.link`}
          rules={{ required: true, validate: isValidDate }}
          control={control}
          render={(props) => (
            <UploadFileButton
              actionCopy={
                props.field.value ? getFileName(props.field.value) : "Add Link"
              }
              accept=".pdf"
              className="w-40 underline text-cyan-500 text-left truncate text-ellipsis"
              folder="files"
              onConfirm={(file) => props.field.onChange(file)}
            />
          )}
        />
        {/*  */}
      </div>

      <button
        className="flex-shrink-0 btn-admin btn-danger btn-sm text-sm w-24"
        type="button"
        onClick={onRemove}
      >
        Delete
      </button>
    </div>
  );
};
