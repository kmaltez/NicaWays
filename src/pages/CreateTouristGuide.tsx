import { useState } from "react";
import { FormValidation } from "../hooks/types";
import { useForm } from "../hooks/useForm";
import { useUIStore } from "../stores/UI.store";
import { LenguageSelection } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../data/data";
import { toast } from "sonner";

export const CreateTouristGuide = () => {
  const { Name } = useUIStore((state) => state.Lenguage);
  const formInit = {
    name: "",
    birthday: "",
    gender: "",
    nationality: "",
    languages: "",
    description: "",
    linkPresentation: "",
    transport: "",
    gastronomy: "",
    place: "",
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
    description: [
      (value) => value.length > 0 && value.length < 300,
      Name === "Español"
        ? "Tu descripción debe estar entre 1 y 300 caracteres"
        : "Your description must be between 1 and 300 characters",
    ],
    linkPresentation: [
      (value) => value.length > 0,
      Name === "Español"
        ? "Tu link de presentación es requerido"
        : " Your presentation link is required",
    ],
  };
  //   Different fields
  const [ProfilePhoto, setProfilePhoto] = useState<File>();
  const [OtherTours, setOtherTours] = useState<FileList>();
  const [InturPhoto, setInturPhoto] = useState<File>();
  const [PoliceRecord, setPoliceRecord] = useState<File>();
  const [CurriculumV, setCurriculumV] = useState<File>();
  const [DriverLicence, setDriverLicence] = useState<File>();
  const { formValues, formValidation, isFormValid, onChange, updateForm } =
    useForm(formInit, formValidations);
  const [formSubmited, setFormSubmited] = useState(false);
  const [CurrentPage, setCurrentPage] = useState<1 | 2 | 3>(1);
  const Navigate = useNavigate();
  const {
    name,
    birthday,
    gender,
    nationality,
    languages,
    description,
    linkPresentation,
    transport,
    gastronomy,
    place,
  } = formValues;
  const {
    nameValid,
    birthdayValid,
    genderValid,
    nationalityValid,
    languagesValid,
    descriptionValid,
    linkPresentationValid,
  } = formValidation;
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setFormSubmited(true);
    if (
      !ProfilePhoto ||
      !OtherTours ||
      !InturPhoto ||
      !PoliceRecord ||
      !CurriculumV ||
      !DriverLicence
    ) {
      toast.error("Please upload all the required files");
      return;
    }
    if (isFormValid) {
      console.log(formValues);
      setFormSubmited(false);
      Navigate("/verificationInProgress");
    }
  };
  return (
    <div className="bg-white w-full">
      <LenguageSelection />
      {CurrentPage > 1 ? (
        <button
          onClick={() => {
            const newPage = CurrentPage - 1;
            if (newPage === 1 || newPage === 2) {
              setCurrentPage(newPage);
            }
          }}
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
        </button>
      ) : (
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
      )}
      <h1 className="text-center mt-20 text-blueSea text-3xl font-raleway">
        {Name === "Español" ? "Crea tu cuenta" : "Create your account"}
      </h1>
      {/* Labels and fields */}
      <form
        className="w-2/3 m-auto flex flex-col md:grid md:grid-cols-2 gap-2 pb-8"
        onSubmit={handleSubmit}
      >
        {CurrentPage === 1 && (
          <>
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
                <option value="3">
                  {Name === "Español" ? "Otro" : "Other"}
                </option>
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
              className="col-span-2 bg-greenTale py-1 rounded-lg text-white snap-center mx-auto w-full mt-12 max-w-96 "
              type="button"
              onClick={() => setCurrentPage(2)}
            >
              {Name === "Español" ? "Continuar" : "Continue"}
            </button>
          </>
        )}
        {CurrentPage === 2 && (
          <>
            <span className="font-raleway mt-4 md:col-span-2">
              {Name === "Español"
                ? "Experiencia Profesional"
                : "Profesional Experience"}
            </span>
            <div className="flex justify-between w-full m-auto font-glacial">
              <label htmlFor="ProfilePhoto" className="flex flex-col">
                <span>
                  {Name === "Español" ? "Foto de perfil*" : "Profile picture*"}
                </span>
                <span className="text-gray-400 text-xs">.png, .jpg</span>
              </label>
              <label htmlFor="ProfilePhoto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0b0d0d"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>{" "}
              </label>
              <input
                type="file"
                id="ProfilePhoto"
                name="ProfilePhoto"
                value={""}
                // Only this extensions
                accept=".jpg, .png"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files) {
                    setProfilePhoto(ev.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="flex flex-col w-full m-auto font-glacial">
              <label htmlFor="name">
                {Name === "Español"
                  ? "Breve descripción de ti*"
                  : "Short description of you*"}
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="ex. Juan Perez"
                value={description as string}
                className="rounded-md border border-gray-300 p-1"
                onChange={onChange}
              />
              {descriptionValid && formSubmited && (
                <p className="text-red-500 font-glacial">{descriptionValid}</p>
              )}
              <span>{(description as string).length}/300</span>
            </div>
            <div className="flex justify-between w-full m-auto font-glacial">
              <label htmlFor="OtherTours" className="flex flex-col">
                <span>
                  {Name === "Español"
                    ? "Subir imágenes de otros tours*"
                    : "Upload images of other tours*"}
                </span>
                <span className="text-gray-400 text-xs">.png, .jpg</span>
              </label>
              <label htmlFor="OtherTours">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0b0d0d"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>{" "}
              </label>
              <input
                type="file"
                id="OtherTours"
                name="OtherTours"
                value={""}
                // Allow multiple
                multiple
                // Only this extensions
                accept=".jpg, .png"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files) {
                    setOtherTours(ev.target.files);
                  }
                }}
              />
            </div>
            <div className="flex flex-col w-full m-auto font-glacial">
              <label htmlFor="linkPresentation">
                {Name === "Español" ? "Nombre completo*" : "Full Name*"}
              </label>
              {Name === "Español" ? (
                <span className="text-xs">
                  Graba un video breve presentándote y súbelo a Youtube,
                  Compártenos el link acá.
                </span>
              ) : (
                <span className="text-xs">
                  Record a short video introducing yourself and upload it to
                  Youtube, Share the link here.
                </span>
              )}
              <input
                type="text"
                id="linkPresentation"
                name="linkPresentation"
                placeholder="https://www.youtube.com/watch?v=..."
                value={linkPresentation as string}
                className="rounded-md border border-gray-300 p-1"
                onChange={onChange}
              />
              {linkPresentationValid && formSubmited && (
                <p className="text-red-500 font-glacial">
                  {linkPresentationValid}
                </p>
              )}
            </div>
            <span className="font-raleway mt-4 md:col-span-2">
              {Name === "Español"
                ? "Tu oferta personal*"
                : "Your personal offer*"}
            </span>
            <span className="text-xs md:col-span-2">
              {Name === "Español"
                ? "¿Qué incluye tu experiencia personalizada?"
                : "What does your personalized experience include?"}
            </span>
            <div className="flex flex-col w-full m-auto font-glacial">
              <select
                name="transport"
                id="transport"
                value={transport as string}
                onChange={(ev) =>
                  updateForm({ ...formValues, transport: ev.target.value })
                }
                className="rounded-md border border-gray-300 p-2"
              >
                <option value="" disabled>
                  {Name === "Español" ? "Transporte" : "Transport"}
                </option>
                <option value="1">
                  {" "}
                  {Name === "Español" ? "Sedán" : "Sedan"}{" "}
                </option>
                <option value="2">
                  {Name === "Español" ? "Camioneta o microbus" : "Truck or bus"}
                </option>
                <option value="3">
                  {Name === "Español"
                    ? "No poseo transporte propio"
                    : "I do not have my own transport"}
                </option>
              </select>
            </div>
            <div className="flex flex-col w-full m-auto font-glacial">
              <select
                name="place"
                id="place"
                value={place as string}
                onChange={(ev) =>
                  updateForm({ ...formValues, place: ev.target.value })
                }
                className="rounded-md border border-gray-300 p-2"
              >
                <option value="" disabled>
                  {Name === "Español" ? "Gastronomía" : "Gastronomy"}
                </option>
                <option value="1">
                  {" "}
                  {Name === "Español"
                    ? "Comida local/tradicional"
                    : "Local/Traditional Food"}{" "}
                </option>
                <option value="2">
                  {Name === "Español" ? "Restaurantes" : "Restaurants"}
                </option>
                <option value="3">
                  {Name === "Español" ? "Ambas" : "Both"}
                </option>
              </select>
            </div>
            <div className="flex flex-col w-full m-auto font-glacial">
              <select
                name="gastronomy"
                id="gastronomy"
                value={gastronomy as string}
                onChange={(ev) =>
                  updateForm({ ...formValues, gastronomy: ev.target.value })
                }
                className="rounded-md border border-gray-300 p-2"
              >
                <option value="" disabled>
                  {Name === "Español" ? "Alojamiento" : "Accommodation"}
                </option>
                <option value="1">
                  {" "}
                  {Name === "Español" ? "Hoteles" : "Hotels"}{" "}
                </option>
                <option value="2">
                  {Name === "Español" ? "Hostales" : "Hostels"}
                </option>
                <option value="3">
                  {Name === "Español" ? "Ambas" : "Both"}
                </option>
              </select>
            </div>
            <button
              className="col-span-2 bg-greenTale py-1 rounded-lg text-white snap-center mx-auto w-full mt-2 max-w-96 "
              type="button"
              onClick={() => setCurrentPage(3)}
            >
              {Name === "Español" ? "Continuar" : "Continue"}
            </button>
          </>
        )}
        {CurrentPage === 3 && (
          <>
            <span className="font-raleway mt-4 md:col-span-2">
              {Name === "Español" ? "Documentación" : "Documentation"}
            </span>
            <div className="flex justify-between w-full m-auto font-glacial">
              <label htmlFor="PoliceRecord" className="flex flex-col">
                <span>
                  {Name === "Español"
                    ? "Subir Licencia de Guía de Turismo emitiada por el INTUR*"
                    : " Upload Tourist Licence issued by INTUR*"}
                </span>
              </label>
              <label htmlFor="InturPhoto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0b0d0d"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>{" "}
              </label>
              <input
                type="file"
                id="InturPhoto"
                name="InturPhoto"
                value={""}
                // Only this extensions
                accept=".jpg, .png"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files) {
                    setInturPhoto(ev.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="flex justify-between w-full m-auto font-glacial">
              <label htmlFor="PoliceRecord" className="flex flex-col">
                <span>
                  {Name === "Español"
                    ? "Subir Récord Policial"
                    : "Upload Police Record"}
                </span>
              </label>
              <label htmlFor="PoliceRecord">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0b0d0d"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>{" "}
              </label>
              <input
                type="file"
                id="PoliceRecord"
                name="PoliceRecord"
                value={""}
                // Only this extensions
                accept=".jpg, .png, .pdf"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files) {
                    setPoliceRecord(ev.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="flex justify-between w-full m-auto font-glacial">
              <label htmlFor="CurriculumV" className="flex flex-col">
                <span>
                  {Name === "Español"
                    ? "Subir Curriculum Vitae"
                    : "Upload Curriculum Vitae"}
                </span>
              </label>
              <label htmlFor="CurriculumV">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0b0d0d"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>{" "}
              </label>
              <input
                type="file"
                id="CurriculumV"
                name="CurriculumV"
                value={""}
                // Only this extensions
                accept=".jpg, .png"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files) {
                    setCurriculumV(ev.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="flex justify-between w-full m-auto font-glacial">
              <label htmlFor="DriverLicence" className="flex flex-col">
                <span>
                  {Name === "Español"
                    ? "Subir Licencia de Conducir"
                    : "Upload Drivers Licence"}
                </span>
              </label>
              <label htmlFor="DriverLicence">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#0b0d0d"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>{" "}
              </label>
              <input
                type="file"
                id="DriverLicence"
                name="DriverLicence"
                value={""}
                // Only this extensions
                accept=".jpg, .png"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files) {
                    setDriverLicence(ev.target.files[0]);
                  }
                }}
              />
            </div>
            <button
              className="col-span-2 bg-greenLemon py-1 rounded-lg text-white snap-center mx-auto w-full max-w-96 mt-4"
              type="submit"
            >
              {Name === "Español" ? "Confirmar" : "Confirm"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};
