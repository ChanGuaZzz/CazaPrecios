import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { session } from "../models/interfaces";

// Define the type for our context

// Define the type for the session if needed

interface AppContextType {
  //   language: 'en' | 'es';
  //   Texts: typeof Texts['en'] | typeof Texts['es'];
  //   toggleLanguage: () => void;
  session: session | null; // Define session type here if needed
  getSession: () => void;
  setSession: (session: session | null) => void; // Define session type here if needed
  handleLogout: () => void; // Define handleLogout type here if needed
}

// Provide a default value that matches the context type
const AppContext = createContext<AppContextType>({
  //   language: 'es',
  //   Texts: Texts['es'],
  //   toggleLanguage: () => {},
  session: null,
  getSession: () => {},
  setSession: () => {},
  handleLogout: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  //   const [language, setLanguage] = useState<'en' | 'es'>('es');
  //   const toggleLanguage = () => {
  //     setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'es' : 'en'));
  //   };
  const [session, setSession] = useState<session | null>(null); // Define session state here if needed

  const getSession = () => {
    axios
      .get(`${import.meta.env.VITE_URL_SERVER}/getsession`, { withCredentials: true })
      .then((response) => {
        // Make a copy of the user data
        if (!response.data.user) {
          console.log("sessiones vacias:", response.data);
          return;
        }

        setSession(response.data.user);
        console.log("Session data:", response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
      });
  };

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_URL_SERVER}/logout`, { withCredentials: true })
      .then((response) => {
        setSession(null);
        console.log("Logout successful:", response.data);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  // Fetch session data when the provider mounts
  useEffect(() => {
    getSession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        // language,
        // Texts: Texts[language as keyof typeof Texts],
        // toggleLanguage,
        getSession,
        session, // Pass session state to context
        setSession, // Pass setSession function to context
        handleLogout, // Pass handleLogout function to context
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
