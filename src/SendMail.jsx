import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./SendMail.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const SendMail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    console.log(formData);
    addDoc(collection(db, "mails"), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };

  return (
    <div className="send-mail">
      <div className="send-mail__header">
        <h3>New Message</h3>
        <Close
          className="send-mail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="To"
          type="text"
          {...register("to", { required: true })}
        />
        {errors.to?.type === "required" && (
          <p className="send-mail__error" role="alert">
            To is required!
          </p>
        )}
        <input
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.to?.type === "required" && (
          <p className="send-mail__error" role="alert">
            Subject is required!
          </p>
        )}
        <input
          className="send-mail__message"
          placeholder="Your message goes here..."
          type="text"
          {...register("message", { required: true })}
        />
        {errors.to?.type === "required" && (
          <p className="send-mail__error" role="alert">
            Message is required!
          </p>
        )}
        <div className="send-mail__options">
          <Button
            className="send-mail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SendMail;
