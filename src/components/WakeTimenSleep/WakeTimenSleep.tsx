import type { FormData } from "../../types/formType";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

function wakeTimenSleep({ register, errors }: Props) {
  return (
    <form className="section-box  dynapuff p-3 ">
      {/* Wake up time */}
      <div className="mb-3">
        <h5 className="form-label text-center" style={{ color: "#533B4D" }}>
          Woke up time?
        </h5>
        <input
          type="time"
          id="wakeUpTime"
          className="form-control w-auto mx-auto d-block custom-note-textarea p-1"
          style={{ color: "#E83389", fontSize: "18px" }}
          {...register("wakeUpTime")}
        />
        {errors.wakeUpTime && (
          <p className="text-danger mt-1 text-center">
            {errors.wakeUpTime.message}
          </p>
        )}
      </div>

      {/* Sleep Hour */}
      <div className="mb-3">
        <h5 className="form-label text-center  " style={{ color: "#533B4D" }}>
          ᶻ 𝗓 Slept Hour?
        </h5>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <input
            type="number"
            id="sleepHour"
            min={0}
            max={24}
            className="form-control w-auto  d-block custom-note-textarea text-center p-1"
            style={{ color: "#E83389", fontSize: "18px" }}
            {...register("sleepHour")}
          />
          <p className="mb-0" style={{ color: "#E83389" }}>
            Hr.
          </p>
        </div>
        {errors.sleepHour && (
          <p className="text-danger mt-1 text-center">
            {errors.sleepHour.message}
          </p>
        )}
      </div>
    </form>
  );
}

export default wakeTimenSleep;
