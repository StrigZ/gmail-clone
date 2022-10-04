import {
  LabelImportantOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./EmailRow.css";
import { selectMail } from "./features/mailSlice";

const EmailRow = ({ id, title, subject, description, time }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const openMail = () => {
    dispatch(selectMail({ id, title, subject, description, time }));
    navigation("/mail");
  };

  return (
    <div onClick={openMail} className="email-row">
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
