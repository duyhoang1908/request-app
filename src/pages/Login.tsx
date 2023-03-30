import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";

const initLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState(initLoginForm);

  const handleLogin = async () => {
    if (loginForm.email.trim() && loginForm.password.trim()) {
      try {
        await signInWithEmailAndPassword(
          auth,
          loginForm.email,
          loginForm.password
        );
        localStorage.setItem("userID", JSON.stringify(auth?.currentUser?.uid));
        navigate("/");
      } catch (error) {
        toast("Đăng nhập thất bại!");
      }
    } else {
      toast("Vui lòng nhập đủ thông tin!");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
    setLoginForm(initLoginForm);
  };

  const handleChange =
    (name: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm((prev) => ({ ...prev, [name]: e.target.value }));
    };
  return (
    <div className="login flex">
      <form
        className="bg-white m-auto md:min-w-[450px] md:p-7 rounded-2xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={loginForm.email}
            onChange={handleChange("email")}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={loginForm.password}
            onChange={handleChange("password")}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Đăng nhập
          </button>

          <Link to="/register" className="text-blue-700 underline text-base">
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
