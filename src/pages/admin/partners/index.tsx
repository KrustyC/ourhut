import { useEffect } from "react";
import { toast } from "react-toastify";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAdminIndexFiles } from "@/hooks/useAdminIndexFiles";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { ImageCard } from "@/components/admin/Cards/ImageCard";
import { ViewImageModal } from "@/components/admin/Modals/ViewImageModal";
import { DeleteImageModal } from "@/components/admin/Modals/DeleteImageModal";
import { UploadFileButton } from "@/components/admin/UploadFileButton";
import { NextPageWithLayout } from "@/types/app";

const AdminPartners: NextPageWithLayout<undefined> = () => {
  const {
    files: partners,
    loading,
    onSelectFile: onSelectImage,
    fileSelectedForDetail: partnerSelectedForDetail,
    fileSelectedForRemove: partnerSelectedForRemove,
    onConfirmFileUpload,
    onCancelView,
    onWantToDeleteFile,
    onDeleteSuccess,
    onCancelDelete,
    error,
  } = useAdminIndexFiles<{ partnerLogos: string[] }>({
    fetchUrlPath: "/admin-partners",
    parseResponse: (response) => response.partnerLogos,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching partners");
    }
  }, [error]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Partners</h2>
        <UploadFileButton
          accept=".jpg, .jpeg, .png"
          actionCopy="Upload New Partner Logo"
          folder="partners"
          onConfirm={onConfirmFileUpload}
        />
      </div>

      <p className="text-gray-600">
        In this section you can manage your Partners. Click on any partner to
        view it in its full size or delete it.
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
          onWantToDeleteFile={() =>
            onWantToDeleteFile(partnerSelectedForDetail)
          }
        />
      ) : null}

      {partnerSelectedForRemove ? (
        <DeleteImageModal
          path="/admin-partners"
          imageToDelete={partnerSelectedForRemove}
          onSuccess={onDeleteSuccess}
          onCancel={onCancelDelete}
        />
      ) : null}
    </div>
  );
};

AdminPartners.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminPartners;
