import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loading from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Compile = lazy(() => import("./pages/Compiler"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));
const AllCodes = lazy(() => import("./pages/AllCodes"));
const MyCodes = lazy(() => import("./pages/MyCodes"));

export default function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-codes" element={<MyCodes />} />
        <Route path="/compiler/:urlId?" element={<Compile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
