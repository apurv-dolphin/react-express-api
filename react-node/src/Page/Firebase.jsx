import UserTable from "../component/firebase/UserTable";
import { UserDataProvider } from "../contextAPI/firebase/firebaseContextAPI";

export default function Firebase() {
  return (
    <UserDataProvider>
      <UserTable />
    </UserDataProvider>
  );
}
