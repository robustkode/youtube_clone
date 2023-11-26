import { auth } from "../../firebase";
import { provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { setUser, logoutUser, setError } from "../slices/authSlice";

export const login = () => {
  return async (dispatch) => {
    try {
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
      const res = await signInWithPopup(auth, provider);

      const accessToken = res.user.accessToken;
      const oauth = res._tokenResponse.oauthAccessToken;
      const user = {
        name: res.user.displayName,
        photoURL: res.user.photoURL,
        oauth: oauth,
      };

      console.log(res, "here i am the user");

      sessionStorage.setItem("ytc-oauth-token", JSON.stringify(oauth));
      sessionStorage.setItem("ytc-access-token", JSON.stringify(accessToken));
      sessionStorage.setItem("ytc-user", JSON.stringify(user));

      dispatch(setUser({ accessToken, oauth, user }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(logoutUser());

    sessionStorage.removeItem("ytc-access-token");
    sessionStorage.removeItem("ytc-user");
    sessionStorage.removeItem("ytc-oauth-token");

    const navigate = useNavigate();
    navigate("/");
  };
};
