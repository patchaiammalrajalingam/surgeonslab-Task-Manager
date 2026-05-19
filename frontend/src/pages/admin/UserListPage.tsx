import { motion } from "framer-motion";

import { useAdmin } from "../../context/AdminContext";

const UserListPage = () => {

  const { users } =
    useAdmin();

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
      className="
        bg-white
        rounded-3xl
        border
        border-teal-200
        shadow-[0_0_25px_rgba(13,148,136,0.12)]
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div className="bg-gradient-to-r from-teal-700 to-teal-500 text-white p-4 sm:p-6">

        <h2 className="text-2xl sm:text-3xl font-bold">
          User List
        </h2>

        <p className="text-white/80 text-sm mt-1">
          Manage all medical staff users
        </p>
      </div>

      {/* MOBILE RESPONSIVE TABLE */}

     <div className="w-full overflow-x-auto">

  <table className="w-full border-collapse">

    {/* HEADER */}

    <thead>

      <tr className="bg-teal-600 text-white">

        <th className="
          py-4
          px-3
          text-center
          text-sm
          sm:text-base
          w-[35%]
        ">
          Name
        </th>

        <th className="
          py-4
          px-3
          text-center
          text-sm
          sm:text-base
          w-[45%]
        ">
          Email
        </th>

        <th className="
          py-4
          px-3
          text-center
          text-sm
          sm:text-base
          w-[20%]
        ">
          Role
        </th>
      </tr>
    </thead>

    {/* BODY */}

    <tbody>

      {users.map((user) => (

        <tr
          key={user._id}
          className="
            border-b
            border-teal-100
            hover:bg-teal-50
            transition-all
            duration-300
          "
        >

          {/* NAME */}

          <td className="py-4 px-3">

            <div className="
              flex
              items-center
              justify-center
              gap-3
            ">

              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-teal-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                  flex-shrink-0
                "
              >

                {user.name
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

              <p className="
                text-slate-800
                font-medium
                text-xs
                sm:text-sm
                md:text-base
                break-words
                text-center
              ">

                {user.name}

              </p>
            </div>
          </td>

          {/* EMAIL */}

          <td className="
            py-4
            px-3
            text-center
            text-slate-600
            text-xs
            sm:text-sm
            md:text-base
            break-all
          ">

            {user.email}

          </td>

          {/* ROLE */}

          <td className="py-4 px-3 text-center">

            <span
              className="
                bg-teal-600
                text-white
                px-3
                py-1.5
                rounded-full
                text-[11px]
                sm:text-sm
                font-medium
                inline-block
              "
            >

              {user.role}

            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </motion.div>
  );
};

export default UserListPage;