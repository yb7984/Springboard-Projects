/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');
const Joke = require('./Joke');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} joined "${this.room.name}".`
    });
  }

  /** handle a chat: broadcast to room. */

  async handleChat(text) {

    if (text === "/joke") {
      //return a joke
      try {
        const joke = await Joke.getJoke();

        this.send(JSON.stringify({ type: "get-joke", text: joke }));

      } catch (error) {
        //if can't get a joke back
        this.send(JSON.stringify({ type: "get-joke", text: "no joke for you" }));
      }
    } else if (text === "/members") {
      //list all members
      this.send(JSON.stringify({ type: "members", text: this.room.getMemberNames() }));

    } else if (text.startsWith("/name ")) {
      //change username
      const msgParts = text.split(" ");
      const username = msgParts[1];
      const oldname = this.name;
      this.name = username;

      this.room.broadcast({
        type: "note",
        text: `${oldname} has been changed to ${username}`
      });

    } else if (text.startsWith("/priv ")) {
      //send to one user only
      const msgParts = text.split(" ");
      const username = msgParts[1];
      const msg = `${text.substring(6 + username.length)}(Private message)`;

      const member = this.room.getMember(username);

      if (member != null) {
        const data = {
          name: this.name,
          type: "chat",
          text: msg
        };
        this.send(JSON.stringify(data));
        member.send(JSON.stringify(data));
      } else {
        this.send(JSON.stringify({
          type: "note",
          text: `can't find member with username ${username}`
        }));
      }

    } else {

      this.room.broadcast({
        name: this.name,
        type: 'chat',
        text: text
      });
    }

  }

  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   */

  async handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    if (msg.type === 'join') this.handleJoin(msg.name);
    else if (msg.type === 'chat') await this.handleChat(msg.text);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} left ${this.room.name}.`
    });
  }
}

module.exports = ChatUser;
