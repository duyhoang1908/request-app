import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { addNewUser } from "../utils/connectFirebase";
import { newUserData } from "../utils/func";

const initRegisterForm = {
  department: "IT",
  email: "",
  password: "",
  name: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState(initRegisterForm);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      const data = newUserData(
        registerForm.email,
        registerForm.name,
        registerForm.department,
        auth?.currentUser?.uid as string
      );
      await addNewUser(data);
      toast("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.warning("Đã có lỗi xảy ra vui lòng thử lại sau.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleRegister();
    setRegisterForm(initRegisterForm);
  };

  const handleChange =
    (name: "email" | "password" | "department" | "name") =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setRegisterForm((prev) => ({ ...prev, [name]: e.target.value }));
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
            value={registerForm.email}
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
            value={registerForm.password}
            onChange={handleChange("password")}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="name"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={registerForm.name}
            onChange={handleChange("name")}
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tên người dùng
          </label>
        </div>

        <div className="mb-6">
          <label htmlFor="underline_select" className="sr-only">
            {registerForm.department}
          </label>
          <select
            id="underline_select"
            value={registerForm.department}
            onChange={handleChange("department")}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="IT">IT</option>
            <option value="Media">Media</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Đăng ký
          </button>

          <Link to="/login" className="text-blue-700 underline text-base">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
