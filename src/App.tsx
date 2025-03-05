import AblyClient from './ablyClient'
import { useState } from 'react'
import * as Ably from 'ably'
import { ChatClient, ChatClientProvider, ChatRoomProvider, RoomOptionsDefaults } from '@ably/chat';
import { Messages } from './Messages';

function App() {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [client, setClient] = useState<Ably.Realtime | null>(null);
  
  const toggleSignIn = () => {
      setIsSignedIn((prev) => !prev); // Toggles the sign-in state
    };

  if (client) {
    client.connection.on((stateChange) => {
       console.log('User is signed '+(isSignedIn ? 'in' : 'out') + ' and new connection state is ' + stateChange.current);
    });
  } 
  return (
    <>
      <AblyClient
         signedIn={isSignedIn}
         client={client}
         setClient={setClient}>
        <button onClick={ toggleSignIn }>{
          isSignedIn
          ? "Click to log out"
          : "Click to sign-in"}
        </button>
        { isSignedIn && client &&
          <ChatClientProvider client={new ChatClient(client, {})}>
            <ChatRoomProvider id="morni-chatroom" options={RoomOptionsDefaults}>
              <div>
                <Messages />
              </div>
            </ChatRoomProvider>
          </ChatClientProvider>
      }
      </AblyClient>
    </>

  )
}

export default App
