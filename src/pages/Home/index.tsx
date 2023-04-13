import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import loading from "../../assets/image/loading.gif";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    switch (user?.role) {
      case "staff":
        navigate("/myrequest");
        break;
      case "manager":
        navigate(`/list/${user?.department}`);
        break;
      default:
        navigate("/request/add");
    }
  }, [user?.role]);

  return (
    <div className="w-screen h-screen flex">
      <img className="m-auto max-w-sm" src={loading} alt="" />
    </div>
  );
};

export default Home;
