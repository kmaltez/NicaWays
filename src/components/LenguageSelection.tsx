import { useEffect, useRef, useState } from "react";
import { useUIStore } from "../stores/UI.store";

export const LenguageSelection = () => {
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
  return (
    <section className="absolute right-2 top-2 select-none">
      <button
        ref={toggleButton}
        onClick={changeStateUserSettings}
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
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
          onClick={() => {
            UpdateLenguage(
              CurrentLenguage.Logo === "spain.png"
                ? { Logo: "usa.png", Name: "English" }
                : { Logo: "spain.png", Name: "Español" }
            );
            setOpenLenguage(false);
          }}
          className="w-8 h-8 rounded-full overflow-hidden hover:border"
        >
          <img
            src={`/Images/Flags/${
              CurrentLenguage.Logo === "spain.png" ? "usa.png" : "spain.png"
            }`}
            alt="spain"
            className="rounded-full h-8 w-8"
          />
        </button>
      </div>
    </section>
  );
};
