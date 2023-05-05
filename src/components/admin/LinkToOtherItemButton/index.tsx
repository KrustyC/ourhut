import type { ReactElement } from "react";
import { useState } from "react";
import { ChooseItemModal } from "./ChooseItemModal";
import { BinIcon } from "@/components/icons/Bin";

interface LinkToOtherItemProps<T, Response> {
  value?: T | null;
  onChange: (value: T | null) => void;
  fetchPath: string;
  labelAttribute: keyof T;
  parseResponse: (response: Response) => T[];
}

export const LinkToOtherItemButton = <
  T extends Record<string, unknown>,
  Response
>(
  props: LinkToOtherItemProps<T, Response>
): ReactElement | null => {
  const { value, onChange, fetchPath, labelAttribute, parseResponse } = props;
  console.log(labelAttribute, value);
  const [showModal, setShowModal] = useState(false);

  const onSelectItem = (newValue: T) => {
    onChange(newValue);
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const onRemoveLink = () => onChange(null);

  return (
    <>
      {showModal && (
        <ChooseItemModal
          fetchPath={fetchPath}
          currentItem={value || undefined}
          labelAttribute={labelAttribute}
          parseResponse={parseResponse}
          onSelectItem={onSelectItem}
          onCancel={onCancel}
        />
      )}

      <div className="flex gap-x-3">
        <button
          className="btn-admin btn-primary btn-sm"
          type="button"
          onClick={onShowModal}
        >
          {!value ? "Add" : "Edit"} Link
        </button>

        {value ? (
          <button
            className="btn-admin btn-danger btn-sm"
            type="button"
            onClick={onRemoveLink}
          >
            <BinIcon className="fill-white h-4 h-4" />
          </button>
        ) : null}
      </div>
    </>
  );
};
