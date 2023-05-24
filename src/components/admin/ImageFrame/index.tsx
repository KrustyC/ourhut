/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./ImageFrame.module.css";

interface ImageFrameProps {
  image: string;
  isSelected?: boolean;
  onClearImage?: (image: string) => void;
}

export const ImageFrame: React.FC<ImageFrameProps> = ({
  image,
  isSelected = false,
  onClearImage,
}) => {
  const [imageNeedsClearing, setImageNeedsClearing] = useState(false);

  const onImageError = () => setImageNeedsClearing(true);

  return (
    <div
      className={`${styles["img-frame"]} ${
        isSelected ? styles["img-frame-selected"] : ""
      } relative`}
    >
      <div className={styles["img-container"]}>
        <img
          src={image}
          width="100%"
          height="20px"
          alt="image"
          onError={onImageError}
        />
      </div>

      {imageNeedsClearing && onClearImage && (
        <div className="absolute bottom-[5px] right-[5px]">
          <button
            className="btn-admin btn-danger ml-4 btn-sm"
            type="button"
            onClick={() => onClearImage(image)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
