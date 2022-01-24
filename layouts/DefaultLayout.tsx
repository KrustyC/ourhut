export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className="flex justify-between items-center">
      <div>{children}</div>
    </div>
  );
};
