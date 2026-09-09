import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../common/constant";
import useAuth from "../../hooks/userauthhook";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    const url = `${API_URL}/properties`;
    axios.get(url, {
      withCredentials: true,
    });
  }, []);

  return <div>Home</div>;
};

export default Home;
