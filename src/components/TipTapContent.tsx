import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";

interface TipTapContentProps {
  content: any;
}

// @OTDO this should be a pure component
export const TipTapContent: React.FC<TipTapContentProps> = ({ content }) => {
  const html = useMemo(
    () => generateHTML(content, [Document, Paragraph, Text, Bold]),
    []
  );

  return <div className="font-semibold">{parse(html)}</div>;
};
