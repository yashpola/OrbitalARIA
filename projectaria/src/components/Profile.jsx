import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";
import { useContext } from "react";
import { adminAccessContext } from "./LoginScreen";

export default function Profile() {
  const adminAccess = useContext(adminAccessContext);
  return <>{adminAccess ? <AdminProfile /> : <UserProfile />}</>;
}
