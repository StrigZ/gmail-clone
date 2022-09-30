import {
  LabelImportantOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import "./EmailRow.css";
const EmailRow = ({ id, title, subject, description, time }) => {
  return (
    <div className="email-row">
      <div className="email-row__options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton>
          <LabelImportantOutlined />
        </IconButton>
      </div>
      <h3 className="email-row__title">{title}</h3>
      <div className="email-row__message">
        <h4>
          {subject}
          <span className="email-row__description"> - {description}</span>
        </h4>
      </div>
      <p className="email-row__time">{time}</p>
    </div>
  );
};
export default EmailRow;
