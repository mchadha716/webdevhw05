// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import {Socket} from "phoenix";

let socket = new Socket(
  "/socket",
  {params: {token: ""}}
);

socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("game:1", {});

let state = {
  secret: "____", // TODO: figure this part out - should secret be word?
  guesses: [],
};

let callback = null;

// The server sent us a new state
function state_update(st) {
  console.log("new state", st);
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) { // TODO this might be wrong (he wrote ch_join)
  callback = cb;
  callback(state);
}

export function ch_push(guess) {
  channel.push("guess", guess)
  .receive("ok", state_update)
  .receive("error", resp => {
     console.log("Unable to push", resp)
   });
}

export function ch_reset() {
  channel.push("reset", {})
         .receive("ok", state_update)
         .receive("error", resp => {
           console.log("Unable to push", resp)
         });
}

channel.join()
  .receive("ok", state_update)
  .receive("error", resp => {
    console.log("Unable to join", resp)
  });
