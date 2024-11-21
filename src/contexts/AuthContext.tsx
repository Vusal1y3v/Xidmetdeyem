import React, { createContext, useEffect, useState } from "react";
import { checkRequest } from "../features/auth/auth.services.ts";
import { getCookie } from "../libs/cookie.ts";

export const AuthContext = createContext<{
  auth: {
    isAuth: boolean | null;
    role: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      isAuth: boolean | null;
      role: string;
    }>
  >;
}>({
  auth: { isAuth: null, role: "" },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{
    isAuth: boolean | null;
    role: string;
  }>({
    isAuth: null,
    role: "",
  });

  const check = async () => {
    const { status, data } = await checkRequest();

    if (getCookie("allianceToken") === "" || status !== 200) {
      setAuth({
        isAuth: false,
        role: "",
      });
    } else {
      setAuth({
        isAuth: true,
        role: data.role,
      });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      await check();
    };
    checkUser().catch(() => {});
  }, []);

  const data = {
    auth,
    setAuth,
  };

  if (auth.isAuth !== null)
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
