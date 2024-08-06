import React, { useState } from "react";
import ROLE from "../common/role";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-toastify";
import SummeryApi from "../common/ApiURI";

const ChangeUserRole = ({userId, name, email, role, onClose, callfunc}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeRole = (e) => {
    setUserRole(e.target.value);

    console.log("User Role ==>", e.target.value);
  };

  const updateUserRole = async() =>{
    const fetchResponse = await fetch(SummeryApi.updateUser.url,{
        method : SummeryApi.updateUser.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            userId : userId,
            role : userRole
        })
    })

    const responseData = await fetchResponse.json()

    if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callfunc()
    }

    console.log("role updated",responseData)

}
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-white bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <CgCloseO />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex my-4">
          <p className="mr-3">Role : </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeRole}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block rounded-full px-3 py-1 bg-red-500 text-white hover:bg-red-600 hover:text-black"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
