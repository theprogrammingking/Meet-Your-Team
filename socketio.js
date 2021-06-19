const { io } = require("./app");
const getMeet = require("./utils/getMeet");
const { makeId } = require("./utils/uuid");

const meetingRooms = new Set();
// const meetingStates = {};

// Create new meeting
const newMeeting = (client) => {
  const meetId = makeId(8);
  meetingRooms.add(meetId);
  // client.join(meetId);
  client.emit("newMeeting", {
    meetId,
  });
};

// Join meeting with meetId
const joinMeeting = (client, userId, meetId, user) => {
  // const meet = getMeet(meetId);
  if (meetingRooms.has(meetId)) {
    console.log("join meeting", userId, user.name);
    client.join(meetId);
    if (userId)
      client.broadcast.to(meetId).emit("user-connected", { userId, user });
  } else {
    client.emit("user-connected", { error: "Invalid meeting link" });
  }
};

module.exports = { newMeeting, joinMeeting, meetingRooms };
