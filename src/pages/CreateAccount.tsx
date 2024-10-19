import { Link, useNavigate } from "react-router-dom";
import type { FormValidation } from "../hooks/types";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { countries } from "../data/data";
import { useUIStore } from "../stores/UI.store";
import { LenguageSelection } from "../components";

export const CreateAccount = () => {
  const { Name } = useUIStore((state) => state.Lenguage);
  const formInit = {
    name: "",
    birthday: "",
    gender: "",
    nationality: "",
    languages: "",
  };
  const formValidations: FormValidation = {
    name: [
      (value) => value.length > 0,
      Name === "Español" ? "Tu nombre es requerido" : "Your name is required.",
    ],
    birthday: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Tu fecha de nacimiento es requerida"
        : "Your birthday is required.",
    ],
    gender: [
      (value) => value.length > 0,
      Name === "Español" ? "Tu género es requerido" : "Gender is required.",
    ],
    nationality: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Tu nacionalidad es requerida"
        : "Your nationality is required.",
    ],
    languages: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Tus idiomas son requeridos"
        : "Your languages are required.",
    ],
  };
  const { formValues, formValidation, isFormValid, onChange, updateForm } =
    useForm(formInit, formValidations);
  const [formSubmited, setFormSubmited] = useState(false);
  const { name, birthday, gender, nationality, languages } = formValues;
  const {
    nameValid,
    birthdayValid,
    genderValid,
    nationalityValid,
    languagesValid,
  } = formValidation;
  const Navigate = useNavigate();
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setFormSubmited(true);
    if (isFormValid) {
      console.log(formValues);
      setFormSubmited(false);
      Navigate("/verificationInProgress");
    }
  };
  return (
    <div className="bg-white w-full">
      <LenguageSelection />
      <Link
        to={"/experience"}
        className="
      fixed top-4 left-4 text-greenTale"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#00a9a9"
        >
          <path d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z" />
        </svg>
      </Link>
      <h1 className="text-center mt-20 text-blueSea text-3xl font-raleway">
        {Name === "Español" ? "Crea tu cuenta" : "Create your account"}
      </h1>
      {/* Labels and fields */}
      <form
        className="w-2/3 m-auto flex flex-col md:grid md:grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        <span className="font-raleway mt-4 md:col-span-2">
          {Name === "Español" ? "Datos Personales" : "Personal Data"}
        </span>
        <div className="flex flex-col w-full m-auto font-glacial">
          <label htmlFor="name">
            {Name === "Español" ? "Nombre completo*" : "Full Name*"}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="ex. Juan Perez"
            value={name as string}
            className="rounded-md border border-gray-300 p-1"
            onChange={onChange}
          />
          {nameValid && formSubmited && (
            <p className="text-red-500 font-glacial">{nameValid}</p>
          )}
        </div>
        <div className="flex flex-col w-full m-auto font-glacial">
          <label htmlFor="birthday">
            {Name === "Español" ? "Fecha de nacimiento*" : "Birthday*"}
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={birthday as string}
            className="rounded-md border border-gray-300 p-1"
            onChange={onChange}
          />
          {birthdayValid && formSubmited && (
            <p className="text-red-500 font-glacial">{birthdayValid}</p>
          )}
        </div>
        <div className="flex flex-col w-full m-auto font-glacial">
          <label htmlFor="gender">
            {Name === "Español" ? "Género*" : "Gender*"}
          </label>
          <select
            name="gender"
            id="gender"
            value={gender as string}
            onChange={(ev) =>
              updateForm({ ...formValues, gender: ev.target.value })
            }
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="" disabled>
              {Name === "Español"
                ? "Selecciona una opción"
                : "Select an option"}
            </option>
            <option value="1">
              {" "}
              {Name === "Español" ? "Femenino" : "Female"}{" "}
            </option>
            <option value="2">
              {Name === "Español" ? "Másculino" : "Male"}
            </option>
            <option value="3">{Name === "Español" ? "Otro" : "Other"}</option>
          </select>
          {genderValid && formSubmited && (
            <p className="text-red-500 font-glacial">{genderValid}</p>
          )}
        </div>
        <div className="flex flex-col w-full m-auto font-glacial">
          <label htmlFor="nationality">
            {Name === "Español" ? "Nacionalidad*" : "Nationality*"}
          </label>
          <select
            name="nationality"
            id="nationality"
            value={nationality as string}
            onChange={(ev) =>
              updateForm({ ...formValues, nationality: ev.target.value })
            }
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="" disabled>
              {Name === "Español"
                ? "Selecciona una opción"
                : "Select an option"}
            </option>
            {countries.map((country) => (
              <option key={"country" + country.value} value={country.value}>
                {country.name}
              </option>
            ))}
          </select>
          {nationalityValid && formSubmited && (
            <p className="text-red-500 font-glacial">{nationalityValid}</p>
          )}
        </div>
        <div className="flex flex-col w-full m-auto font-glacial">
          <label htmlFor="languages">
            {Name === "Español" ? "Idiomas*" : "Languages*"}
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            placeholder="ex. Español, English"
            value={languages as string}
            className="rounded-md border border-gray-300 p-1"
            onChange={onChange}
          />
          {languagesValid && formSubmited && (
            <p className="text-red-500 font-glacial">{languagesValid}</p>
          )}
        </div>
        <button
          className="col-span-2 bg-greenLemon py-1 rounded-lg text-white snap-center mx-auto w-full mt-12 max-w-96 "
          type="submit"
        >
          {Name === "Español" ? "Confirmar" : "Confirm"}
        </button>
      </form>
    </div>
  );
};
