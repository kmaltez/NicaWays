import { Navigate, Route, Routes } from "react-router-dom";
import {
  CreateAccount,
  Home,
  Login,
  SignUp,
  TypeExperience,
  Welcome,
} from "../pages";
import { useSessionStore } from "../stores/Session.store";
import { CreateTouristGuide } from "../pages/CreateTouristGuide";

export const AppRoutes = () => {
  const session = useSessionStore((state) => state.session);
  return (
    <Routes>
      {session === "Logged In" && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/experience" element={<TypeExperience />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/createTouristGuide" element={<CreateTouristGuide />} />
          <Route path="/*" element={<Navigate to={"/home"} replace />} />
        </>
      )}
      {session === "Logged Out" && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/*" element={<Navigate to={"/welcome"} replace />} />
        </>
      )}
    </Routes>
  );
};
