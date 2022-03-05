import { MaterialLink } from "@/types/global";

interface ResourceLinkProps {
  link?: MaterialLink;
}

export const ResourceLink: React.FC<ResourceLinkProps> = ({ link }) => {
  if (!link) {
    return <span>-</span>;
  }

  return (
    <a
      className="text-black underline"
      href={link.value}
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.type === "pdf" ? "pdf" : "website"}
    </a>
  );
};
