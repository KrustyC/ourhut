import { useCallback } from "react";
import { LinkIcon } from "@/components/icons/Link";
import { ScissorsIcon } from "@/components/icons/Scissors";
import type { Editor } from "@tiptap/react";
import { BubbleMenu as TipTapBubbleMenu } from "@tiptap/react";

interface BubbleMenuProps {
  editor: Editor;
}

interface BubbleMenuButtonProps {
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<BubbleMenuButtonProps> = ({
  isActive,
  disabled = false,
  onClick,
  children,
}) => (
  <button
    className={`text-white h-8 w-8 border-r-2 rounded-l-lg border-white px-2 hover:bg-gray-600 ${
      isActive ? "text-emerald-500" : ""
    } disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-800`}
    type="button"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const unsetLink = () => editor.chain().focus().unsetLink().run();

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex relative items-center bg-gray-800 rounded-lg py-4 h-8 z-50"
    >
      <Button onClick={setLink} isActive={editor.isActive("link")}>
        <LinkIcon height="h-4" width="h-4" />
      </Button>

      <Button
        onClick={unsetLink}
        isActive={false}
        disabled={!editor.isActive("link")}
      >
        <ScissorsIcon height="h-4" width="h-4" />
      </Button>

      <Button
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </Button>

      <Button
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        i
      </Button>

      <Button
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        S
      </Button>
    </TipTapBubbleMenu>
  );
};
