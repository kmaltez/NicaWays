import { Link } from "react-router-dom";
import { LenguageSelection } from "../components";
import { useUIStore } from "../stores/UI.store";

export const TypeExperience = () => {
  const { Name } = useUIStore((state) => state.Lenguage);
  return (
    <div className="bg-blueSea h-svh w-full flex flex-col">
      {/* Lenguage Selection */}
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
      <h1 className="font-bold text-4xl my-4 capitalize text-center text-white mt-24">
        {Name === "Español"
          ? "¿Qué experiencia buscas?"
          : "Which experience are you looking for?"}
      </h1>
      <div className="flex flex-col md:flex-row w-2/3 mx-auto gap-4 mt-12 font-raleway text-greenTale text-3xl ">
        <Link
          to={"/signup"}
          className="bg-white rounded-xl py-6 hover:bg-gray-200 flex items-center text-center capitalize w-full"
        >
          <span className="ml-auto pl-4">
            {Name === "Español" ? "Turista" : "Tourist"}
          </span>
          <img
            src="/Images/Maleta.png"
            alt="maletaLogo"
            className="h-24 mr-auto"
          />
        </Link>
        <Link
          to={"/createAccount"}
          className="bg-white rounded-xl py-6  hover:bg-gray-200 flex items-center text-center capitalize w-full"
        >
          <img
            src="/Images/Avioncito.png"
            alt="avioncitoLogo"
            className="h-24 ml-auto"
          />
          <span className="mr-auto">
            {Name === "Español" ? "Guía turístico" : "Tour guide"}
          </span>
        </Link>
      </div>
    </div>
  );
};
