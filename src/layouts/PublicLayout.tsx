import { useEffect, useRef } from "react";
import { useUIStore } from "../stores/UI.store";
import { Link } from "react-router-dom";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const PillShowing = useUIStore((state) => state.PillShowing);
  const PillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (PillShowing) {
      PillRef.current?.classList.add("animate__fadeInLeftBig");
      PillRef.current?.classList.remove("animate__fadeOutLeftBig");
    } else {
      PillRef.current?.classList.add("animate__fadeOutLeftBig");
      PillRef.current?.classList.remove("animate__fadeInLeftBig");
    }
  }, [PillShowing]);

  return (
    <div className="bg-blueSea h-svh w-full grid grid-rows-3">
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
      <img
        src="/Images/LogoPrincipal.png"
        alt="logoNicaWays"
        className="m-auto h-full "
      />
      <div
        ref={PillRef}
        className="fixed bottom-0 left-0 h-2/3 w-full rounded-tr-[100px] bg-white animate__animated row-span-2"
      >
        <div className="z-10 font-raleway">{children}</div>
      </div>
    </div>
  );
};
