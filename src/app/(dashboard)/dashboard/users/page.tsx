import { userService } from "@/services/user.service";
import UserList from "./user-list";

export default async function Page() {
 const { users, totalPages } = await userService.getUsers(1, 10);

 return (
  <UserList users={users} totalPages={totalPages} />
 )
}
