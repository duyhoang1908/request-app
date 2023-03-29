import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../redux/Slice/UserSlice";

const Home = () => {
  const navigate = useNavigate();

  const user = useSelector(userSelector);

  useEffect(() => {
    switch (user.role) {
      case "staff":
        navigate("/myrequest");
        break;
      case "manager":
        navigate(`/list/${user.department}`);
        break;
      default:
        navigate("/request");
    }
  }, [user.role]);

  return <div>Home</div>;
};

export default Home;
