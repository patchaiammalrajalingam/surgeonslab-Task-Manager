import { useState } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";

const NewUserPage = () => {
  const { fetchData } = useAdmin();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ERROR STATES
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // SUCCESS MESSAGE
  const [successMessage, setSuccessMessage] = useState("");

  // VALIDATION FUNCTION
  const validateForm = () => {
    let isValid = true;

    // CLEAR OLD SUCCESS MESSAGE
    setSuccessMessage("");

    // USERNAME VALIDATION
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!name.trim()) {
      setNameError("Username is required");
      isValid = false;
    } else if (!nameRegex.test(name)) {
      setNameError(
        "Username should contain only letters"
      );
      isValid = false;
    } else {
      setNameError("");
    }

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(
        "Enter a valid email address"
      );
      isValid = false;
    } else {
      setEmailError("");
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain uppercase, lowercase, number & symbol"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // CREATE USER
  const createUser = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await API.post("/users", {
        name,
        email,
        password,
        role: "user",
      });

      // CLEAR INPUTS
      setName("");
      setEmail("");
      setPassword("");

      fetchData();

      // SUCCESS MESSAGE
      setSuccessMessage(
        "User created successfully!"
      );
    } catch (error) {
      console.log(error);

      setSuccessMessage("");

      alert("Failed to create user");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="w-full"
    >
      <div
        className="
        bg-white
        rounded-3xl
        border
        border-teal-200
        shadow-[0_0_25px_rgba(13,148,136,0.15)]
        p-5
        sm:p-6
        lg:p-8
        max-w-2xl
      "
      >
        {/* HEADER */}

        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-700">
            Create User
          </h2>

          <p className="text-teal-500 mt-1 text-sm">
            Add new staff members
          </p>
        </div>

        {/* SUCCESS MESSAGE */}

        {successMessage && (
          <div
            className="
              mb-4
              bg-green-100
              text-green-700
              border
              border-green-300
              p-3
              rounded-xl
            "
          >
            {successMessage}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={createUser}
          className="space-y-5"
        >
          {/* NAME */}

          <div>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => {
                const value =
                   e.target.value.replace(
                   /[^A-Za-z\s]/g,
                   ""
                  );

                 setName(value);
                }}
              className="
                w-full
                bg-white
                text-black
                border
                border-teal-200
                p-3
                rounded-2xl
                outline-none
                focus:border-teal-500
              "
            />

            {nameError && (
              <p className="text-red-500 text-sm mt-1">
                {nameError}
              </p>
            )}
          </div>

          {/* EMAIL */}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                bg-white
                text-black
                border
                border-teal-200
                p-3
                rounded-2xl
                outline-none
                focus:border-teal-500
              "
            />

            {emailError && (
              <p className="text-red-500 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* PASSWORD */}

          <div>
            <input
              type="password"
              placeholder="Set Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white
                text-black
                border
                border-teal-200
                p-3
                rounded-2xl
                outline-none
                focus:border-teal-500
              "
            />

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* BUTTON */}

          <div className="pt-2">
            <button
              type="submit"
              className="
                bg-teal-600
                text-white
                px-8
                py-3
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                hover:bg-cyan-500
              "
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default NewUserPage;