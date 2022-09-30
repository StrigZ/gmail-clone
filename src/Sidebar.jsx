import {
  AccessTime,
  Add,
  Duo,
  ExpandMore,
  Inbox,
  LabelImportant,
  NearMe,
  Note,
  Person,
  Phone,
  Star,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Button className="sidebar__compose" startIcon={<Add fontSize="large" />}>
        Compose
      </Button>
      <SidebarOption Icon={Inbox} title="Inbox" number={64} selected={true} />
      <SidebarOption Icon={Star} title="Starred" number={64} />
      <SidebarOption Icon={AccessTime} title="Snoozed" number={30} />
      <SidebarOption Icon={LabelImportant} title="Important" number={30} />
      <SidebarOption Icon={NearMe} title="Sent" number={30} />
      <SidebarOption Icon={Note} title="Drafts" number={30} />
      <SidebarOption Icon={ExpandMore} title="More" number={30} />
      <div className="sidebar__footer">
        <div className="sidebar__footer-icons">
          <IconButton>
            <Person />
          </IconButton>
          <IconButton>
            <Duo />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
