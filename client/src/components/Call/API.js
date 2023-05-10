//Auth token we will use to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2NjI3Y2I2Ny1hZTY0LTQ0NmYtYjJiYS00MTJlZTQzMDkyYjkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MzY5NDIxNywiZXhwIjoxNjg0Mjk5MDE3fQ.JbZVrxHZu7Jg-QE1C-veBDMvQPb3VIwTnWjLJcAAgjU";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  console.log('api calling')
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};