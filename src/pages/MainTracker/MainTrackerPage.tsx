import { useForm, FormProvider } from "react-hook-form";
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
import Swal from "sweetalert2";

function MainTrackerPage() {
  const methods = useForm<FormData>({
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "friend"; // fallback
  const storageKey = `trackerRecords_${username}`; // key แยกตาม user

  const onSubmit = async (data: FormData) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to edit this later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E83389",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const updated = [...existing, data];
      localStorage.setItem(storageKey, JSON.stringify(updated));

      await Swal.fire({
        title: "Submitted!",
        text: "Your entry has been saved.",
        icon: "success",
        confirmButtonColor: "#E83389",
      });

      navigate("/record");
    }
  };

  return (
    <div className="vh-100  d-flex flex-column align-items-center justify-content-start p-4">
      <FormProvider {...methods}>
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
            <DatePicker errors={errors} username={username} />
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
          <div className="d-flex justify-content-center gap-3 mb-5">
            <button
              type="button"
              className="btn btn-back dynapuff px-4"
          
              onClick={() => navigate("/record")}
            >
              Back
            </button>

            <button
              type="submit"
              className="btn dynapuff submit-btn"
              style={{
                borderRadius: "100px",
                padding: "10px 30px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default MainTrackerPage;
