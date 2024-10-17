import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "../stores/Session.store";

export const Home = () => {
  const userData = useSessionStore((state) => state.userData);
  const LogOut = useSessionStore((state) => state.Logout);
  const [OpenUserSettings, setOpenUserSettings] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);

  const changeStateUserSettings = () => {
    setOpenUserSettings(!OpenUserSettings);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      toggleButton.current &&
      toggleButton.current.contains(event.target as Node)
    ) {
      return;
    }
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpenUserSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white h-svh font-raleway">
      <nav className="flex justify-between bg-greenTale sticky top-0 py-2">
        <span className="text-2xl text-white self-center mx-2">Nica Ways</span>
        <button ref={toggleButton} onClick={changeStateUserSettings} className="mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#fafafa"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
        </button>
        {OpenUserSettings && (
          <div
            ref={ref}
            className={`${
              OpenUserSettings ? " " : " hidden "
            }fixed top-12 right-2 rounded-lg border py-1 px-2 bg-white border-gray-300 font-glacial text-end `}
          >
            <p>Bienvenido {userData?.name}</p>
            <hr />
            <button onClick={() => LogOut()}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};
