export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        Default Layout
        <div>{children}</div>
      </div>
    </div>
  );
};
