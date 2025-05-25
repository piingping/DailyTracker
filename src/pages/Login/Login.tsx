import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username must be at most 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must include letters and numbers"
    ),
});

type LoginData = z.infer<typeof loginSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    console.log("Login info:", data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/record")
  };



  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-start p-4">
      {/* Navbar title */}
      <h1 className="mb-4 lily-script-one-regular" style={{color:' #E83389'}}>🧸Daily Tracker｡:*</h1>
      <div className="gradient-line mb-4">  &nbsp;</div>
      
      {/* Login box */}
      <div className="login-box text-center p-10 purple rounded dynapuff w-auto ">
        <h2 className="fw-bold mb-4  lily-script-one-regular">
          ⟡ Welcome ⋆˙
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 text-start">
            <label className="form-label text-pink">Username</label>
            <div className="input-group">
              <span className="input-group-text border-0">@</span>
              <input className="form-control"  {...register("username")} />
            </div>
            {errors.username && (
              <small className="text-danger">{errors.username.message}</small>
            )}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-pink">Email</label>
            <input
              className="form-control"
              type="email"
              
              {...register("email")}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-pink">Password</label>
            <input
              className="form-control"
              type="password"
              
              {...register("password")}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
            <small
              className="text-muted d-block mt-1 "
              style={{ fontSize: "12px" }}
            >
              ✿ at least 6 characters.
              <br />✿ must include letter and number
            </small>
          </div>

          <button type="submit" className="btn btn-pink w-100 fw-bold ">
            NEXT
          </button>
        </form>
      </div>

      {/* Footer note */}
      <div>
        <p
          className="text-muted mt-3  "
          style={{ fontSize: "0.7rem", marginBottom: "1rem" }}
        >
          Note: This login form is currently for design and validation purposes
          only.
          <br />
          The actual login functionality has not been implemented yet.
        </p>
      </div>
    </div>
  );
}

export default Login;
