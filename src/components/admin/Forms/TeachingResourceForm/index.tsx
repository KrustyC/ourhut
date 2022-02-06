import { Controller, useForm, useFieldArray } from "react-hook-form";
import { TeachingResource } from "@/types/global";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { TeachingResourceMaterial } from "@/types/global";
import { LoadingSpinner } from "../../LoadingSpinner";
import { Input } from "../../Input";
import { MaterialInput } from "./MaterialInput";
import { MaterialAdd } from "./MaterialAdd";

interface TeachingResourceFormProps {
  className?: string;
  teachingResource?: TeachingResource;
  pending?: boolean;
  onSaveTeachingResource: (teachingResource: TeachingResource) => void;
}

const DEFAULT_TEACHING_RESOURCE: TeachingResource = {
  title: "",
  materials: [],
  image: "",
};

export const TeachingResourceForm: React.FC<TeachingResourceFormProps> = ({
  teachingResource = DEFAULT_TEACHING_RESOURCE,
  pending,
  onSaveTeachingResource,
}) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<TeachingResource>({
    defaultValues: { ...teachingResource },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const watchFieldArray = watch("materials");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const onAddMaterial = (material: TeachingResourceMaterial) => {
    append(material);
  };

  const onRemoveMaterial = (index: number) => {
    remove(index);
  };

  console.log("materials", controlledFields);

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onSaveTeachingResource)}
    >
      <div className="flex mb-8">
        <div className="mb-4 w-full">
          <Input
            register={register}
            options={{ required: "Please add a title" }}
            error={errors.title}
            label="Title"
            name="title"
            type="text"
            placeholder="Teaching resource Title"
          />
        </div>
      </div>

      <div className="flex flex-col w-2/3">
        <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
          Image
        </span>

        <Controller
          name="image"
          render={(props) => (
            <div className="w-60">
              <ImageSelector
                currentImage={props.field.value}
                error={errors?.image}
                onBlur={() => props.field.onBlur()}
                onSelectImage={(image) => {
                  props.field.onChange(image);
                }}
              />
            </div>
          )}
          control={control}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lx mt-8 text-black font-semibold">
          Your Materials
        </h3>
        <ul className="mt-4">
          {controlledFields.map((material, index) => (
            <li key={material.id} className="mt-4">
              <MaterialInput
                name={`materials.${index}`}
                register={register}
                control={control as any}
                onRemove={() => onRemoveMaterial(index)}
              />
            </li>
          ))}
        </ul>

        <h3 className="text-xl text-black font-semibold mb-2 mt-8">
          Add New Material
        </h3>
        <div className="flex flex-col">
          <MaterialAdd onAdd={onAddMaterial} />
        </div>
      </div>

      <div className="flex items-center border-t-2 border-slate-300 pt-4 h-24">
        <button
          className="btn-admin btn-primary mr-4"
          type="submit"
          disabled={pending || !isValid || !isDirty}
        >
          {pending ? <LoadingSpinner /> : "Save Teacher Resource"}
        </button>
      </div>
    </form>
  );
};
