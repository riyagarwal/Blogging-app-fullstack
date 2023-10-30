import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import UserCard from "../components/Users/UserCard";

function FollowingList() {
  const [followingList, setFollowingList] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/follow/get-following-list`, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        let followingListArr = [];
        res.data.data.forEach((user) => {
          const userObj = {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            follow: true,
          };

          followingListArr.push(userObj);
        });

        setFollowingList(followingListArr);
      })
      .catch((err) => {
        alert(err);
      });
  }, [token]);

  const divStyle = {
    padding: "30px",
    width: "70%",
    margin: "auto",
  };

  const h1Style = {
    textAlign: "center",
    margin: "10px auto 0px",
    letterSpacing: "1.5px",
  };

  const h4Style = {
    textAlign: "center",
    margin: "20px auto 0px",
    fontWeight: "400",
    letterSpacing: "0.5px",
  };

  return (
    <>
      <Header />
      <div style={divStyle}>
        <h1 style={h1Style}>Following</h1>
        <hr style={{marginBottom: "30px"}} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {followingList && followingList.length > 0 ? (
            followingList.map((user) => <UserCard props={user} />)
          ) : (
            <h5 style={h4Style}>Follow someone from BlogChain now!</h5>
          )}
        </div>
      </div>
    </>
  );
}

export default FollowingList;
