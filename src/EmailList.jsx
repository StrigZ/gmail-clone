import {
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  KeyboardHide,
  LocalOffer,
  MoreVert,
  People,
  Redo,
  Settings,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import "./EmailList.css";
import EmailRow from "./EmailRow";
import { db } from "./firebase";
import Section from "./Section";

const EmailList = () => {
  const [email, setEmail] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "mails"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setEmail(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="email-list">
      <div className="email-list__settings">
        <div className="email-list__settings-left">
          <Checkbox />
          <IconButton>
            <ArrowDropDown />
          </IconButton>
          <IconButton>
            <Redo />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        <div className="email-list__settings-right">
          <IconButton>
            <ChevronLeft />
          </IconButton>
          <IconButton>
            <ChevronRight />
          </IconButton>
          <IconButton>
            <KeyboardHide />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
        </div>
      </div>
      <div className="email-list__sections">
        <Section Icon={Inbox} title="Primary" color="red" selected />
        <Section Icon={People} title="Social" color="#1a73e8" />
        <Section Icon={LocalOffer} title="Promotions" color="green" />
      </div>
      <div className="email-list__list">
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test!"
          time="10pm"
        />
        {email.map(({ id, data: { to, subject, message, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
};
export default EmailList;
