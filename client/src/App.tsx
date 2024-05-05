import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Compiler from "./pages/Compiler";
import NotFoundPage from "./pages/NotFoundPage";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";

function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    }
    else if(error){
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
    console.log("data : ", data);
    console.log("error : ", error);
  }, [data, error]);

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compiler/:urlId?" element={<Compiler />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
