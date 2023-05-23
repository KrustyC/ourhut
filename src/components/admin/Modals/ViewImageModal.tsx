/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Modal } from "../Modal";

interface ViewImageModalProps {
  image: string;
  onClose: VoidFunction;
  onWantToDeleteFile: (image: string) => void;
}

export const ViewImageModal: React.FC<ViewImageModalProps> = ({
  image,
  onClose,
  onWantToDeleteFile,
}) => {
  const onConfirm = () => onWantToDeleteFile(image);

  return (
    <Modal>
      <div className="w-full flex justify-center">
        <img className="max-w-md" src={image} alt="preview" />
      </div>

      <div className="flex justify-end mt-4">
        <button className="btn-admin" onClick={onClose}>
          {" "}
          Close{" "}
        </button>

        <button className="btn-admin btn-danger ml-4" onClick={onConfirm}>
          Delete Image
        </button>
      </div>
    </Modal>
  );
};
