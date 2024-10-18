import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../views/Loading";
import { useUIStore } from "../stores/UI.store";

export const Welcome = () => {
  const [ShowLoadingViewEffect, setShowLoadingViewEffect] = useState(false);
  const [ShowLoadingView, setShowLoadingView] = useState(true);
  useEffect(() => {
    const first = setTimeout(() => {
      setShowLoadingViewEffect(true);
    }, 2100);
    const second = setTimeout(() => {
      setShowLoadingView(false);
    }, 3000);
    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, []);

  // Logic to open language selection
  const CurrentLenguage = useUIStore((state) => state.Lenguage);
  const UpdateLenguage = useUIStore((state) => state.ChangeLenguage);
  const [OpenLenguage, setOpenLenguage] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);

  const changeStateUserSettings = () => {
    setOpenLenguage(!OpenLenguage);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      toggleButton.current &&
      toggleButton.current.contains(event.target as Node)
    ) {
      return;
    }
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpenLenguage(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (ShowLoadingView) {
    return <Loading hide={ShowLoadingViewEffect} />;
  }

  return (
    <div className="grid grid-rows-2 bg-blueSea font-raleway h-svh animate__animated animate__fadeIn ">
      <section className="absolute right-2 top-2 select-none">
        <button
          ref={toggleButton}
          onClick={changeStateUserSettings}
          className="w-8 h-8 rounded-full overflow-hidden hover:border"
        >
          <img
            src={`/Images/Flags/${CurrentLenguage.Logo}`}
            alt="currentLenguage"
            className="rounded-full h-8 w-8"
          />
        </button>
        <div
          ref={ref}
          className={`${
            OpenLenguage ? " " : " hidden "
          }fixed top-12 right-2 rounded-lg border items-center py-1 px-2 bg-white border-gray-300 font-glacial text-end `}
        >
          <button
            onClick={() =>
              UpdateLenguage(
                CurrentLenguage.Logo === "spain.svg"
                  ? { Logo: "usa.png", Name: "English" }
                  : { Logo: "spain.svg", Name: "Español" }
              )
            }
            className="w-8 h-8 rounded-full overflow-hidden hover:border"
          >
            <img
              src={`/Images/Flags/${
                CurrentLenguage.Logo === "spain.svg" ? "usa.png" : "spain.svg"
              }`}
              alt="spain"
              className="rounded-full h-8 w-8"
            />
          </button>
        </div>
      </section>
      <section className="bg-transparent flex h-full">
        <img
          src="/Images/FondoOscuro.png"
          alt="logoNicaWays"
          className="m-auto h-full"
        />
      </section>
      <section className="bg-white p-4 flex flex-col h-full rounded-t-3xl">
        <hr className="w-12 bg-gray-800 h-1 rounded-xl mx-auto mt-2" />
        {CurrentLenguage.Name === "Español" ? (
          <h1 className="text-4xl text-darkBlack text-center my-auto">
            Bienvenido
          </h1>
        ) : (
          <h1 className="text-4xl text-darkBlack text-center my-auto">
            Welcome
          </h1>
        )}
        <Link
          to={"/experience"}
          className="border-2 border-darkBlack rounded-2xl p-2 flex max-w-80 self-center w-full  transition-all duration-200 hover:bg-darkBlack hover:text-white"
        >
          <div className="m-auto flex">
            {CurrentLenguage.Name === "Español" ? (
              <p className="self-center">Empezar</p>
            ) : (
              <p className="self-center">Get Started</p>
            )}
            <svg
              className="w-5 h-5 self-center"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-2 my-2 mx-auto w-full max-w-80">
          <Link
            to={"/login"}
            className="bg-greenTale text-white rounded-lg py-2 w-full transition-all duration-200 text-center hover:bg-blueSea "
          >
            {CurrentLenguage.Name === "Español" ? "Iniciar Sesión" : "Login"}
          </Link>
          <Link
            to={"/experience"}
            className="bg-greenTale text-white rounded-lg py-2 w-full transition-all duration-200 text-center hover:bg-blueSea "
          >
            {CurrentLenguage.Name === "Español" ? "Registrarse" : "Register"}
          </Link>
        </div>
      </section>
    </div>
  );
};
