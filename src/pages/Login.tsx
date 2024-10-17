import { useEffect, useState } from "react";
import { FormValidation } from "../hooks/types";
import { useForm } from "../hooks/useForm";
import { PublicLayout } from "../layouts/PublicLayout";
import { useUIStore } from "../stores/UI.store";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../data/data";
import { toast } from "sonner";
import { useSessionStore } from "../stores/Session.store";

export const Login = () => {
  const formInit = {
    email: "",
    password: "",
  };
  const formValidations: FormValidation = {
    email: [(value) => value.length > 0, "Email is required."],
    password: [(value) => value.length > 0, "Your password is required."],
  };
  const { formValues, formValidation, onChange, isFormValid } = useForm(
    formInit,
    formValidations
  );
  // const HidePill = useUIStore((state) => state.HidePill);
  const ShowPill = useUIStore((state) => state.ShowPill);
  const Login = useSessionStore((state) => state.Login);
  const [formSubmited, setFormSubmited] = useState(false);
  const navigate = useNavigate();
  const { email, password } = formValues;
  const { emailValid, passwordValid } = formValidation;
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    // Checking useer
    const userChecked = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!userChecked) {
      toast.error("There is no user with this credentials");
      return;
    }
    toast.success("Welcome!");
    console.log(formValues);
    setFormSubmited(false);
    // Navigate to the next page
    Login({ name: userChecked.name, email: userChecked.email });
    navigate("/home");
  };
  useEffect(() => {
    ShowPill();
  }, []);

  return (
    <PublicLayout>
      <form
        className="flex flex-col mt-8 gap-4 w-64 mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-4xl my-4 capitalize text-center">
          Log in
        </h1>
        <span className="text-center font-light text-gray-500">
          Sign in to continue{" "}
        </span>
        <div className="flex flex-col w-full m-auto">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email as string}
            className="rounded-md border border-gray-300 p-1"
            onChange={onChange}
          />
          {emailValid && formSubmited && (
            <p className="text-red-500 font-glacial">{emailValid}</p>
          )}
        </div>
        <div className="flex flex-col w-full m-auto">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password as string}
            className="rounded-md border border-gray-300 p-1"
            onChange={onChange}
          />
          <a
            href="#"
            className="text-xs text-end text-gray-400 underline hover:text-gray-800 "
          >
            Forgot password?
          </a>
          {passwordValid && formSubmited && (
            <p className="text-red-500 font-glacial">{passwordValid}</p>
          )}
        </div>

        <button className="bg-greenTale text-white rounded-lg py-1 self-center w-1/2 transition-all duration-200 text-center hover:bg-blueSea">
          Log in
        </button>
        <span className="text-center text-sm">Or log in with</span>
        <div className="text-center flex flex-col font-glacial text-gray-500">
          <Link
            to={"/experience"}
            className="text-xs underline text-gray-400 hover:text-gray-800 "
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </PublicLayout>
  );
};
