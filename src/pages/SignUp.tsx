import { Link } from "react-router-dom";
import { FormValidation } from "../hooks/types";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { useUIStore } from "../stores/UI.store";
import { LenguageSelection } from "../components";

export const SignUp = () => {
  const { Name } = useUIStore((state) => state.Lenguage);
  const formInit = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formValidations: FormValidation = {
    email: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Por favor ingrese su correo electrónico."
        : "Please enter your email.",
    ],
    password: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Por favor ingrese su contraseña."
        : "Please enter your password.",
    ],
    confirmPassword: [
      (value) => value === password && value.length > 0,
      Name === "Español"
        ? "Las contraseñas no coinciden."
        : "Passwords do not match.",
    ],
  };
  const { formValues, formValidation, onChange, isFormValid } = useForm(
    formInit,
    formValidations
  );
  const { email, password, confirmPassword } = formValues;
  const { emailValid, passwordValid, confirmPasswordValid } = formValidation;
  const [formSubmited, setFormSubmited] = useState(false);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setFormSubmited(true);
    if (isFormValid) {
      console.log(formValues);
      setFormSubmited(false);
    }
  };
  return (
    <div className="bg-blueSea h-svh w-full flex flex-col">
      <LenguageSelection />
      <Link
        to={"/welcome"}
        className="
      fixed top-4 left-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FAFAFA"
        >
          <path d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z" />
        </svg>
      </Link>
      <form
        className="m-auto flex flex-col w-2/3 max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-4xl capitalize text-center text-white">
          {Name === "Español" ? "Regístrate" : "Sign up"}
        </h1>
        <span className="font-glacial text-white w-full text-center">
          {Name === "Español" ? "Crea una nueva cuenta" : "Create new account"}
        </span>
        <div className="flex flex-col gap-2 w-2/3 m-auto">
          <div className="flex flex-col w-full m-auto mt-6">
            <input
              type="text"
              id="email"
              name="email"
              placeholder={Name === "Español" ? "Correo electrónico" : "Email"}
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
              placeholder={Name === "Español" ? "Contraseña" : "Password"}
              value={password as string}
              className="rounded-md border border-gray-300 p-1"
              onChange={onChange}
            />
            {passwordValid && formSubmited && (
              <p className="text-red-500 font-glacial">{passwordValid}</p>
            )}
          </div>
          <div className="flex flex-col w-full m-auto">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder={
                Name === "Español" ? "Confirmar contraseña" : "Confirm password"
              }
              value={confirmPassword as string}
              className="rounded-md border border-gray-300 p-1"
              onChange={onChange}
            />
            {confirmPasswordValid && formSubmited && (
              <p className="text-red-500 font-glacial">
                {confirmPasswordValid}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col my-6">
          <Link
            to={"/experience"}
            className="bg-greenTale text-white rounded-lg py-1 self-center w-1/2 transition-all duration-200 text-center hover:opacity-90"
          >
            {Name === "Español" ? "Registrarse" : "Sign up"}
          </Link>
          <span className="font-glacial text-white text-center mt-8 mb-4">
            {Name === "Español" ? "O regístrate con" : "Or sign up with"}
          </span>
          <div className="flex w-full gap-4">
            <button className="bg-white w-full rounded-md py-1 transition-all duration-200 hover:bg-gray-200">
              <svg
                className="w-6 h-6 text-greenTale m-auto"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="bg-white w-full rounded-md py-1 transition-all duration-200 hover:bg-gray-200">
              <svg
                className="w-6 h-6 text-greenTale m-auto"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <Link
            to={"/login"}
            className="text-gray-400 text-xs text-center mt-24 underline"
          >
            {Name === "Español"
              ? "¿Ya tienes una cuenta? Inicia sesión"
              : "Already have an account? Log in"}
          </Link>
        </div>
      </form>
    </div>
  );
};
