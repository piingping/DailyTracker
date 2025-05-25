import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../types/formType";
import type { FormData } from "../../types/formType";
import DatePicker from "../../components/DatePicker/DatePicker";
import IconPicker from "../../components/EmotePicker/EmotePicker";
import TodoList from "../../components/TodoList/TodoList";
import WakeTimenSleep from "../../components/WakeTimenSleep/WakeTimenSleep";
import "./MainTrackerPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function MainTrackerPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      mood: "",
      note: "",
      wakeUpTime: "",
      sleepHour: "" as unknown as number,
      todo: [],
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    const existing = JSON.parse(localStorage.getItem("trackerRecords") || "[]");
    const updated = [...existing, data];
    localStorage.setItem("trackerRecords", JSON.stringify(updated));
    console.log("✅ SAVED:", updated);
    navigate("/record");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "friend"; // ✅ fallback ถ้าไม่มีชื่อ

  return (
    <div className="vh-100  d-flex flex-column align-items-center justify-content-start p-4">
      <form
        className=" w-auto container mx-0 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Navbar title */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            className="mb-4 lily-script-one-regular text-center"
            style={{ color: "#E83389" }}
          >
            🧸Daily Tracker｡:*
          </h1>
        </Link>
        <div className="gradient-line mb-4 "> &nbsp;</div>
        <div>
          <DatePicker register={register} errors={errors} username={username}/>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-4 ">
            <div className="box mb-4 ">
              <IconPicker
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <div className="box mt-auto">
              <WakeTimenSleep register={register} errors={errors} />
            </div>
          </div>

          <div className="col-md-6  mb-4 ">
            <div className="box section-box">
              <TodoList
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn px-5 mx-auto mb-5 d-block dynapuff submit-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default MainTrackerPage;
