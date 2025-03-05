import * as Ably from "ably";
import { AblyProvider } from 'ably/react';
import { ReactNode, useEffect } from "react";

interface AblyClientProps {
  children: ReactNode;
  signedIn: boolean;
  client: Ably.Realtime | null;
  setClient: React.Dispatch<React.SetStateAction<Ably.Realtime | null>>
}

const AblyClient: React.FC<AblyClientProps> = ({ children, signedIn, client, setClient}) => {

  useEffect(() => {
    let newClient: Ably.Realtime | null = null;

    if (signedIn) {
      newClient = new Ably.Realtime({
        key: import.meta.env.VITE_ABLY_API_KEY,
        clientId:  Math.random().toString().slice(2, 7)
      });
      
      setClient(newClient);
                
    } else {
      if (client) {
        client.close();
        setClient(null);
      }
    }

    return () => {
      // Clean up the second Ably client if it was created
      if (newClient) {
        newClient.close();
      }
    };
  }, [signedIn]);
  
  // Return children without AblyProvider if not signed in or client not ready
  if (!signedIn || !client) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <AblyProvider client={client}>
      {children}
    </AblyProvider>
  );
};

export default AblyClient;
