import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types/formType";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  username: string;
}

function DatePicker({ register, errors, username }: Props) {

  return (
    <>
      {
        <div className="">
          <div className="dynapuff" style={{ color: "#533B4D" }}>
            {/*DeskTOp */}
            <div className="d-none d-md-flex align-items-center justify-content-between mb-3">
              <h4 className="fw-bold">₊˚⊹ Hello, {username} ✧</h4>
              <div className="d-flex align-items-center gap-2 ms-auto">
                <h4 className="mb-0">♡ Date</h4>
                <input
                  id="date"
                  type="date"
                  className="form-control w-auto"
                   {...register("date")}
                  placeholder="Select date"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.60)",
                    borderColor: "transparent",
                    color: "#533B4D",
                  }}
                 
                />
              </div>
              <div>
                
              </div>
            </div>

            {/* md */}
            <div className="d-flex d-md-none flex-column align-items-center text-center my-4">
              <h4 className="fw-bold">₊˚⊹ Hello, {username} ✧</h4>
              <div className="d-flex align-items-center gap-2 mt-2">
                <h4 className="mb-0">♡ Date</h4>
                <input
                  id="date"
                  type="date"
                  className="form-control w-auto"
                  placeholder="Select date"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.60)",
                    borderColor: "transparent",
                    color: "#533B4D",
                  }}
                  {...register("date")}
                />
              </div>
            </div>
          {/* ✅ Error Message */}
          {errors.date && (
            <p
              className="text-danger text-end mt-1"
              style={{ fontSize: "0.75rem" }}
            >
              {errors.date.message}
            </p>
          )}
          </div>
        </div>
      }
    </>
  );
}

export default DatePicker;
