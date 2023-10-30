import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import UserCard from "../components/Users/UserCard";

function Users() {
  const [users, setUsers] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res1) => {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/follow/get-following-list`,
            {
              headers: {
                "X-Acciojob": token,
              },
            }
          )
          .then((res2) => {
            let followingMap = new Map();

            res2.data.data.forEach((user) => {
              followingMap.set(user.username, true);
            });

            let allUserDetails = [];

            res1.data.data.forEach((user) => {
              if (followingMap.get(user.username)) {
                let userObj = {
                  _id: user._id,
                  username: user.username,
                  name: user.name,
                  email: user.email,
                  follow: true,
                };

                allUserDetails.push(userObj);
              } else {
                let userObj = {
                  _id: user._id,
                  username: user.username,
                  name: user.name,
                  email: user.email,
                  follow: false,
                };

                allUserDetails.push(userObj);
              }
            });

            setUsers(allUserDetails);
          })
          .catch((err) => {
            alert(err);
          });
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

  return (
    <>
      <Header />
      <div style={divStyle}>
        <h1 style={h1Style}>Users</h1>
        <hr style={{ marginBottom: "30px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {users?.map((user) => (
            <UserCard props={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
