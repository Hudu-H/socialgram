import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect } from "react";

// internal components
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  //use useUserContext to fetch user profile
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={180}
            height={38}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || "/assests/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} className="leftsidebar-link">
                <NavLink to={link.route}>{link.label}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
