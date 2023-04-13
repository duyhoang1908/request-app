import jwtDecode, { JwtPayload } from "jwt-decode";
import http from "./http";

const JWTManager = () => {
  let accessToken: string | null = null;
  let refreshTokenTimeoutId: number | null = null;

  const getToken = () => accessToken;

  const setToken = (token: string) => {
    accessToken = token;

    const decoded = jwtDecode<JwtPayload & { _id: string }>(accessToken);
    setRefreshTokenTimeOut((decoded.exp as number) - (decoded.iat as number));
    return true;
  };

  const abortRefeshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    accessToken = null;
    abortRefeshToken();
  };

  const getRefreshToken = async () => {
    try {
      const res = await http.get<{ success: boolean; accessToken: string }>(
        "/refresh_token",
        {
          withCredentials: true,
        }
      );
      setToken(res.data.accessToken);
      return res.status as number;
    } catch (error: any) {
      deleteToken();
      return error.response.status as number;
    }
  };

  const setRefreshTokenTimeOut = (delay: number) => {
    //Goi ham truoc 5s khi accessToken het han
    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      delay * 1000 - 5000
    );
  };

  return { getToken, setToken, getRefreshToken, deleteToken };
};

export default JWTManager();
