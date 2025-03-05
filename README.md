Demo on how to have signed-in and signed-out users while using Ably React.

How to set up

Install Ably and Ably Chat
``bash
npm install @ably/chat
``
Create an `.env` file with your Ably API key with name `VITE_ABLY_API_KEY=...`

Notes on the implementation

I used a component from Ably chat to prove the Ably connection is up and running. I used the example in the getting started page here
https://github.com/ably/ably-chat-js

The best way to get around the errors of the Ably Provider having no API key was just to return a different value when signed out. It is not perfect but it does seem to work.
