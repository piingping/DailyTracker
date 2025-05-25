import "./EmotePicker.css";
import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { FormData } from "../../types/formType";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
}

function IconPicker({ register, errors, setValue }: Props) {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const handleClick = (emoji: string) => {
    if (selectedEmoji === emoji) {
      setSelectedEmoji("");
      setValue("mood", "");
    } else {
      setSelectedEmoji(emoji);
      setValue("mood", emoji, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

  };
  const getEmojiClass = (name: string) => {
    if (selectedEmoji === name) return "selected";
    if (selectedEmoji !== "") return "dimmed";
    return "";
  };

  return (
    <div className="section-box dynapuff p-3  ">
      <h5 className="text-center"style={{ color: "#533B4D" }}>Rate your day</h5>
      <ul className="list-group list-group-horizontal justify-center">
        <input type="hidden" {...register("mood")} />
       
        <li
          className={`emoji list-unstyled ${getEmojiClass("VeryBad")}`}
          onClick={() => handleClick("VeryBad")}
        >
          😖
          <p className="emoji-label">Rough day</p>
        </li>

        <li
          className={`emoji list-unstyled ${getEmojiClass("Bad")}`}
          onClick={() => handleClick("Bad")}
        >
          😕
          <p className="emoji-label">Not so great</p>
        </li>
        <li
          className={`emoji list-unstyled ${getEmojiClass("SoSo")}`}
          onClick={() => handleClick("SoSo")}
        >
          😐
          <p className="emoji-label">Just okay</p>
        </li>
        <li
          className={`emoji list-unstyled ${getEmojiClass("Good")}`}
          onClick={() => handleClick("Good")}
        >
          🙂<p className="emoji-label">Pretty good</p>
        </li>
        <li
          className={`emoji list-unstyled ${getEmojiClass("Excellent")}`}
          style={{
            transition: "transform 0.2s ease",
          }}
          onClick={() => handleClick("Excellent")}
        >
          😄
          <p className="emoji-label">Awesome day!</p>
        </li>
        
      </ul>
       {errors.mood && <p className="text-danger mt-3">{errors.mood.message}</p>}

      <div className="input-container mt-3">
        <textarea
          className="custom-note-textarea"
          placeholder="say something about today..."
          rows={3}
          {...register("note")}
        />
      </div>
      {errors.note && <p className="text-danger">{errors.note.message}</p>}
    </div>
  );
}

export default IconPicker;
