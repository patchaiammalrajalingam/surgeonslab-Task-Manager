import {
  useContext,
  useState,
} from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();
const [error, setError] = useState("");
  const { setUser } =
    useContext(AuthContext);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setError(""); 


    try {
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      setUser(res.data.user);

      if (
        res.data.user.role === "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
       setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden px-4">

      {/* BACKGROUND BLUR */}

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100 rounded-full blur-3xl opacity-40"></div>

      {/* LOGIN CARD */}

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.08)] overflow-hidden">

          {/* TOP SECTION */}

          <div className="bg-gradient-to-r from-teal-600 to-cyan-500 px-10 py-12 text-white text-center relative overflow-hidden">

            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">

              <div className="w-24 h-24 mx-auto rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-4xl font-bold border border-white/20 shadow-lg">
                S
              </div>

              <h1 className="text-4xl font-bold mt-6">
                SurgeonsLab
              </h1>

              <p className="mt-3 text-white/90 leading-7">
                Healthcare Task Management
                Platform
              </p>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="p-8 md:p-10"
          >

            <div className="space-y-6">

              {/* EMAIL */}

              <div>

               

                <div className="relative">

                  <FaEnvelope className="absolute top-5 left-5 text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-14 pr-4 text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>


                <div className="relative">

                  <FaLock className="absolute top-5 left-5 text-gray-400" />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-14 pr-4 text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
               {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
                    {error}
                </div>
              )}
              {/* BUTTON */}

              <button className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                Login
              </button>
            </div>

            {/* FOOTER */}

            <div className="mt-8 text-center">

              <p className="text-gray-500 text-sm leading-6">
                Secure access to the
                SurgeonsLab Healthcare
                Administration System
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;