import { Controller, useForm } from "react-hook-form";
import { TeachingResource } from "@/types/global";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { DayPicker } from "@/components/admin/DayPicker";
import { isValidDescription, isValidDate } from "@/utils/validators";
import { LoadingSpinner } from "../LoadingSpinner";
import { Input } from "../Input";
import { Editor } from "../Editor";

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
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<TeachingResource>({
    defaultValues: { ...teachingResource },
    mode: "onBlur",
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onSaveTeachingResource)}
    >
      <div className="flex mb-8">
        <div className="flex flex-col w-1/2">
          <div className="mb-4">
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

          {/* <div className="flex flex-col mb-4">
            <label className="uppercase block text-gray-700 text-sm font-bold mb-3">
              Date
            </label>

            <Controller
              name="date"
              rules={{ required: true, validate: isValidDate }}
              render={(props) => (
                <DayPicker
                  value={props.field.value}
                  error={errors?.expirationDate}
                  onChange={(newDate) => {
                    props.field.onChange(newDate);
                    props.field.onBlur();
                  }}
                />
              )}
              control={control}
            />
          </div> */}
        </div>

        <div className="w-1/2 ml-8">
          <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
            Image
          </span>

          <Controller
            name="image"
            render={(props) => (
              <ImageSelector
                currentImage={props.field.value}
                error={errors?.image}
                onBlur={() => props.field.onBlur()}
                onSelectImage={(image) => {
                  props.field.onChange(image);
                }}
              />
            )}
            control={control}
          />
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
