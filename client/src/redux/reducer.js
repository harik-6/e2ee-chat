const initState = {
  roomId: null,
  username:null,
  allMessages: [],
  privateKey: null,
  sharedKey: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        loggedIn: true,
      };
    case "setnameandkey":
      return {
        ...state,
        privateKey: action.payload["private_key"],
        username : action.payload["name"]
      };
    case "setsharedkey":
      return {
        ...state,
        sharedKey: action.payload,
        roomId : action.payload
      };
    default:
      return state;
  }
};

export default reducer;
