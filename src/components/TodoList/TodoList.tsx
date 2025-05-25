import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { FormData } from "../../types/formType";
import "./TodoList.css";

interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
}

function TodoList({ setValue, watch, errors }: Props) {
  const todoList = watch("todo"); 
  const [inputText, setInputText] = useState("");
  const [todoError, setTodoError] = useState("");

  const handleAdd = () => {
    const trimmed = inputText.trim();

    if (trimmed.length < 3 || trimmed.length > 20) {
      setTodoError("To-do must be between 3 and 20 characters.");
      return;
    }

    setTodoError("");

    const newItem = {
      text: trimmed,
      checked: false,
    };

    setValue("todo", [...(todoList || []), newItem], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setInputText("");
  };

  const toggleCheck = (index: number) => {
    const updated = [...(todoList || [])];
    updated[index].checked = !updated[index].checked;
    setValue("todo", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDelete = (index: number) => {
    const updated = [...(todoList || [])];
    updated.splice(index, 1); 
    setValue("todo", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="p-3 dynapuff">
      <h5 className=" text-center" style={{ color: "#533B4D" }}>
        To-do List
      </h5>

      <div className="d-flex gap-2 mb-2">
        <input
          type="text"
          className="form-control custom-note-textarea"
          placeholder="type your to-do..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button type="button" className="btn add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>
      {todoError && <p className="text-danger mt-1">{todoError}</p>}

      {errors.todo && (
        <p className="text-danger">{errors.todo.message?.toString()}</p>
      )}

      <div>
        {todoList?.map((item, index) => (
          <div
            className="d-flex justify-content-between align-items-center mb-2"
            key={index}
          >
            <div className="form-check">
              <input
                className="form-check-input custom-checkbox-pink"
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(index)}
                id={`todo-${index}`}
              />
              <label className="form-check-label" htmlFor={`todo-${index}`}>
                {item.text}
              </label>
            </div>

            <img
              src="/delete.png"
              alt="delete"
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
              onClick={() => handleDelete(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
