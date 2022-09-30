import "./SidebarOption.css";

const SidebarOption = ({ Icon, title, number, selected }) => {
  return (
    <div className={`sidebar-option ${selected && "sidebar-option--active"}`}>
      <Icon className="sidebar-option__icon" /> <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
};
export default SidebarOption;
