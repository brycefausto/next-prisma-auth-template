import { userService } from "@/services/user.service";
import UserList from "./user-list";
import { getUserSession } from "@/auth";

export default async function Page() {
 const { users, totalPages } = await userService.getUsers(1, 10);

 const isAuth = await getUserSession();

 return (
  <UserList users={users} totalPages={totalPages} />
 )
}
