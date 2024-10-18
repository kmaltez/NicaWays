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
  const { Name } = useUIStore((state) => state.Lenguage);
  const formInit = {
    email: "",
    password: "",
  };
  const formValidations: FormValidation = {
    email: [
      (value) => value.length > 0,
      Name === "Español" ? "Tu correo es requerido" : "Your email is required.",
    ],
    password: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Tu contraseña es requerida"
        : "Your password is required.",
    ],
  };
  const { formValues, formValidation, onChange, isFormValid } = useForm(
    formInit,
    formValidations
  );
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
    navigate("/experience");
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
          {Name === "Español" ? "Iniciar sesión" : "Log in"}
        </h1>
        <span className="text-center font-light text-gray-500">
          {Name === "Español"
            ? " Inicia sesión para continuar"
            : "Sign in to continue"}
        </span>
        <div className="flex flex-col w-full m-auto">
          <input
            type="text"
            id="email"
            name="email"
            placeholder={Name === "Español" ? " Correo*" : "Email*"}
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
            placeholder={Name === "Español" ? " Contraseña*" : "Password*"}
            value={password as string}
            className="rounded-md border border-gray-300 p-1"
            onChange={onChange}
          />
          <a
            href="#"
            className="text-xs text-end text-gray-400 underline hover:text-gray-800 "
          >
            {Name === "Español"
              ? "¿Olvidaste tu contraseña?"
              : "Forgot password?"}
          </a>
          {passwordValid && formSubmited && (
            <p className="text-red-500 font-glacial">{passwordValid}</p>
          )}
        </div>

        <button className="bg-greenTale text-white rounded-lg py-1 self-center w-1/2 transition-all duration-200 text-center hover:bg-blueSea">
          {Name === "Español" ? "Iniciar Sesión" : "Log in"}
        </button>
        <span className="text-center text-sm">
          {Name === "Español" ? "O iniciar sesión con" : "Or log in with"}
        </span>
        <div className="flex w-full gap-4">
          <button className="bg-white w-full rounded-md py-1 transition-all duration-200 border border-blueSea hover:bg-gray-200">
            <svg
              className="w-6 h-6 text-blueSea m-auto"
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
          <button className="bg-white w-full rounded-md py-1 transition-all duration-200 border border-blueSea hover:bg-gray-200">
            <svg
              className="w-6 h-6 text-blueSea m-auto"
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
        <div className="text-center flex flex-col font-glacial text-gray-500">
          <Link
            to={"/signup"}
            className="text-xs underline text-gray-400 hover:text-gray-800 "
          >
            {Name === "Español"
              ? "¿No tienes una cuenta? Regístrate"
              : "Don't have an account? Sign up"}
          </Link>
        </div>
      </form>
    </PublicLayout>
  );
};
