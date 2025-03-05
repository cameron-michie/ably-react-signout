import React, { createContext, useContext, useEffect, useState } from "react";
import * as Ably from "ably";

interface AblyContextType {
  client: Ably.Realtime | null;
  signedIn: boolean;
  toggleSignIn: () => void;
}

// Create context
const AblyContext = createContext<AblyContextType | undefined>(undefined);

export const AblyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Ably.Realtime | null>(null);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const toggleSignIn = () => {
    setSignedIn((prev) => !prev); // Toggles the sign-in state
  };

  useEffect(() => {
    let newClient: Ably.Realtime | null = null;

    if (signedIn) {
      newClient = new Ably.Realtime({
        key: import.meta.env.VITE_ABLY_API_KEY,
        autoConnect: true,
      });

      setClient(newClient);

      newClient.connection.on((stateChange) => {
        console.log('New connection state is ' + stateChange.current);
      });
    } else {
      if (client) {
        client.close(); // Close existing client if signed out
        setClient(null); // Reset the client state
      }
    }

    return () => {
      if (newClient) {
        newClient.close();
      }
    };
  }, [signedIn]);

  return (
    <AblyContext.Provider value={{ client, signedIn, toggleSignIn }}>
      {children}
    </AblyContext.Provider>
  );
};

export const useAblyContext = () => {
  const context = useContext(AblyContext);
  if (!context) {
    throw new Error("useAblyContext must be used within an AblyProvider");
  }
  return context;
};
