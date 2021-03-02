import { BasicHeader } from "./BasicHeader";

export const BasicLayout: React.FC = ({ children }) => {
  return (
    <div className="BasicLayout">
      <BasicHeader />
      <div className="BasicLayout-body ui-container">{children}</div>
    </div>
  );
};
