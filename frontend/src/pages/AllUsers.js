import React, { useEffect, useState } from "react";
import SummeryApi from "../common/ApiURI";
import { toast } from "react-toastify";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id : ""
  });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log("Userdata==>", allUser);
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummeryApi.allUser.url, {
      method: SummeryApi.allUser.method,
      credentials: "include"
    });
    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-blue-100 p-2 rounded-full hover:bg-blue-300 cursor-pointer"
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <CiEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callfunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
