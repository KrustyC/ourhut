import { useEffect } from "react";
import { toast } from "react-toastify";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAdminIndexFiles } from "@/hooks/useAdminIndexFiles";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { ImageCard } from "@/components/admin/Cards/ImageCard";
import { ViewImageModal } from "@/components/admin/Modals/ViewImageModal";
import { DeleteImageModal } from "@/components/admin/Modals/DeleteImageModal";
import { UploadImageButton } from "@/components/admin/UploadImageButton";
import { NextPageWithLayout } from "@/types/app";

const AdminFiles: NextPageWithLayout<undefined> = () => {
  const {
    files: partners,
    loading,
    onSelectFile: onSelectImage,
    fileSelectedForDetail: partnerSelectedForDetail,
    fileSelectedForRemove: partnerSelectedForRemove,
    onConfirmImageUpload,
    onCancelView,
    onWantToDeleteImage,
    onDeleteSuccess,
    onCancelDelete,
    error,
  } = useAdminIndexFiles<{ partnerLogos: string[] }>({
    fetchUrlPath: "/admin-files",
    parseResponse: (response) => response.partnerLogos,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching files");
    }
  }, [error]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Files</h2>
        <UploadImageButton
          accept=".pdf, .doc, .docx"
          actionCopy="Upload New Partner Logo"
          folder="files"
          onConfirm={onConfirmImageUpload}
        />
      </div>

      <p className="text-gray-600">
        In this section you can manage your Files. Click on any partner to view
        it in its full size or delete it.
      </p>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {partners.map((partner, index) => (
              <ImageCard
                key={partner}
                image={partner}
                onClick={() => onSelectImage(index)}
              />
            ))}
          </>
        )}
      </div>

      {partnerSelectedForDetail ? (
        <ViewImageModal
          image={partnerSelectedForDetail}
          onClose={onCancelView}
          onWantToDeleteImage={onWantToDeleteImage}
        />
      ) : null}

      {partnerSelectedForRemove ? (
        <DeleteImageModal
          imageToDelete={partnerSelectedForRemove}
          onSuccess={onDeleteSuccess}
          onCancel={onCancelDelete}
        />
      ) : null}
    </div>
  );
};

AdminFiles.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminFiles;
