import { UserMongoDataProvider } from "../../contextAPI/mongo/mongoContextAPI";
import EmployeeTable from "../mongo/EmployeeTable";

export default function Mongo() {
  return (
    <UserMongoDataProvider>
      <EmployeeTable />
    </UserMongoDataProvider>
  );
}
