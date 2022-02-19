interface ResourceLinkProps {
  pdf?: string;
  website?: string;
}

export const ResourceLink: React.FC<ResourceLinkProps> = ({ pdf, website }) => {
  if (!!pdf) {
    return (
      <a
        className="text-black underline"
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
      >
        pdf
      </a>
    );
  }

  if (!!website) {
    return (
      <a
        className="text-black underline"
        href={website}
        target="_blank"
        rel="noopener noreferrer"
      >
        website
      </a>
    );
  }

  return <span>-</span>;
};
