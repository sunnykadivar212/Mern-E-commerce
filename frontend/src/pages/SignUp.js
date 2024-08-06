import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SummeryApi from "../common/ApiURI";
import { toast } from "react-toastify";
import Imagetobase64 from "../helpers/Imagetobase64";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: ""
  });

  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    console.log("image==>",file)
    const imagePic = await Imagetobase64(file);
    console.log("Image URL==>",imagePic)
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummeryApi.signUp.url, {
        method: SummeryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const dataApi = await dataResponse.json();
      console.log("dataApi",dataApi);
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password")
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icon" />
            </div>
            <from>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer py-4 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </from>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div>
                  <span>
                    <MdEmail />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaRegEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5">
              SignUp
            </button>
            <p className="my-4">
              Already have account ?{" "}
              <Link
                to={"/login"}
                className="text-red-400 hover:text-red-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
