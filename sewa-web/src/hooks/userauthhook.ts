import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../common/constant";

const fetchUser = async () => {
  const url = `${API_URL}/my-profile`;

  const response = await axios.get(url, {
    withCredentials: true,
  });

  return response.data;
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      let user = null;

      try {
        user = await fetchUser();
      } catch (e) {
        console.log(e);
      }
      if (!user) {
        navigate("/tenant/login");
      }

      setUser(user);
    }

    getUserDetails();
  }, []);

  return { user };
};

export default useAuth;
