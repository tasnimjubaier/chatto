
// ::-webkit-scrollbar {
//   width: 4px;
//   height: 1px;
// }
// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: rgba(54, 103, 176, 0.8);
//   border-radius: 10px;
// }

// .chat-wrapper {
//   height: 100vh;
//   width: 100vw;
// 	display: flex;
//   flex-direction: column;
// 	align-items: center;
// 	justify-content: center;
// }

// .chat-wrapper .box {
//   width: 96%;
//   height: 98%;
//   border-radius: 30px;
//   background: rgba(238, 244, 255, 0.8);
//   border: 2px solid rgba(204, 224, 255, 0.8);

//   display: flex;
//   flex-direction: row;
//   overflow: hidden;
// }
// .chat-wrapper .box .left-panel {
//   height: 100%;
//   width: 30%;
//   background: rgba(230, 239, 255, 0.8);
//   /* overflow: scroll; */
// }
// .chat-wrapper .box .left-panel .topbar {
//   height: 100px;
//   width: 100%;
//   /* background: blue; */

//   display: flex;
// 	align-items: center;
// 	justify-content: center;

//   font-size: 3em;
//   font-weight: 100;
//   font-variant: small-caps;
//   font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
// }

// .chat-wrapper .box .left-panel .users {
//   height: calc(100% - 100px);
//   width: 100%;
//   background: rgba(246, 249, 255, 0.8);
//   overflow: scroll;
// }

// .chat-wrapper .box .left-panel .users .user {
//   padding-left: 20px;
//   width: 95%;
//   height: 40px;
//   border-radius: 10px;
//   background: rgba(222, 235, 255, 0.8);
  
//   display: flex;
//   flex-direction: column;

//   margin-left: 10px;
// }

// .chat-wrapper .box .left-panel .users .user .username {
//   font-size: 1.6em;
//   font-weight: 300;
//   font-variant: small-caps;
//   font-family: 'Lucida Sans', 'Lucida Sans Regular', 
//       'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
// }

// .chat-wrapper .box .left-panel .users .user .last-msg {
//   font-size: 1em;
//   font-weight: 100;
//   font-variant: small-caps;
//   font-family: 'Lucida Sans', 'Lucida Sans Regular', 
//       'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
// }

// .chat-wrapper .box .interactions {
//   height: 100%;
//   width: 70%;
//   /* background: red; */

//   display: flex;
//   flex-direction: column;
//   margin: 0 10px 10px 10px;
// }


// .chat-wrapper .box .interactions .chats {
//   height: calc(100% - 50px);
//   width: 100%;
//   overflow: auto;
//   scroll-behavior: smooth;
  

//   display: flex;
//   flex-direction: column;
//   align-items: left;
// }

// .chat-wrapper .box .interactions .chats .chat {
//   /* min-width: 100px; */
//   max-width: 60%;
//   /* overflow: auto; */
//   border-radius: 10px; 
//   background: rgba(206, 225, 255, 0.8);
//   position: relative;

  
//   display: flex;
// 	align-items: center;
// 	justify-content: left;
//   padding: 10px 25px 10px 25px;
//   margin: 10px;
//   align-self: start;
  

//   font-size: 1em;
//   font-weight: 100;
//   font-variant: small-caps;
//   font-family: 'Lucida Sans', 'Lucida Sans Regular', 
//       'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
// }
// .chat-wrapper .box .interactions .chats .chat.current {
//   justify-content: right;
//   align-self: end;
// }

// .chat-wrapper .box .interactions .chats .chat.sender::before {
//   content: "";
//   display: block;
//   width: 22px;
//   height: 22px;

//   border-radius: 50%;
//   opacity: .8;

//   background: rgb(180, 180, 180);
//   position: absolute;
//   right: -10px;
//   bottom: -2px;
// }
// .chat-wrapper .box .interactions .chats .chat.sender::before:hover {
//   opacity: 1;
// }
// .chat-wrapper .box .interactions .chats .chat::after {
//   content: "";
//   display: block;
// }

// .chat-wrapper .box .interactions .msg-box {
//   width: 100%;
//   height: 50px;
//   /* background: red; */
//   margin: 0 0 10px 0;

//   display: flex;
// 	align-items: center;
// 	/* justify-content: space-betwee; */
//   justify-content: space-between;
// }

// .chat-wrapper .box .interactions .msg-box .input-box {
//   width: 80%;
//   margin: 0 5px 0 10px;
//   padding: 7px 10px;
//   border-radius: 7px;
//   border: 2px solid rgba(177, 208, 255, 0.8);
//   outline: none;

//   font-size: 1.2em;
//   transition: .13s ease-in-out;
// }
// .chat-wrapper .box .interactions .msg-box .input-box:hover {
//   border: 2px solid rgba(137, 182, 251, 0.8);
// }
// .chat-wrapper .box .interactions .msg-box .input-box:focus {
//   border: 2px solid rgba(83, 150, 250, 0.8);
// }

// .chat-wrapper .box .interactions .msg-box .send-msg-button {
//   width: 20%;
//   height: 41px;
//   margin: 0 10px 0 0;
//   padding: 7px 10px;
//   border-radius: 7px;
//   outline: none;
//   border: none;
//   background: rgba(131, 179, 255, 0.8);

//   display: flex;
// 	align-items: center;
// 	justify-content: center;

//   font-size: 1.6em;
//   font-weight: 600;
//   font-variant: small-caps;
//   letter-spacing: .1rem;
//   font-family: 'Lucida Sans', 'Lucida Sans Regular', 
//       'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

//   transition: .14s;
// }

// .chat-wrapper .box .interactions .msg-box .send-msg-button:hover {
//   background: rgba(6, 100, 252, 0.8);
//   color:rgba(255, 255, 255, 0.8);
//   cursor: pointer;
// }