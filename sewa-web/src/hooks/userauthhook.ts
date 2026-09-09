import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { API_URL } from "../common/constant";
import { useEffect, useState } from "react";

const fetchUser = async () => {
  const url = `${API_URL}/my-profile`;

  let response = await axios.get(url, {
    withCredentials: true,
  });

  return response.data;
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const user = await fetchUser();
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
