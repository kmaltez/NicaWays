import { useUIStore } from "../stores/UI.store";

export const VerificationPage = () => {
  const { Name } = useUIStore((state) => state.Lenguage);
  return (
    <div className="h-screen w-full bg-[url('/Images/Pattern.png')] bg-[size:200%] bg-repeat flex">
      <div className="w-96 h-96 bg-blueSea  m-auto rounded-full flex flex-col">
        <div className="text-white font-raleway m-auto text-2xl text-center">
          {Name === "Español"
            ? "Tu perfil está en proceso de verificación"
            : "Your profile it's been verified"}
          <span className="block text-base font-glacial">
          {Name === "Español"
            ? "Nos pondremos en contacto pronto"
            : "We will contact you soon"}
          </span>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};
