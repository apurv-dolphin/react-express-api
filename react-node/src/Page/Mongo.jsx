import EmployeeTable from "../component/mongo/EmployeeTable";
import { UserMongoDataProvider } from "../contextAPI/mongo/mongoContextAPI";

export default function Mongo() {
  return (
    <UserMongoDataProvider>
      <EmployeeTable />
    </UserMongoDataProvider>
  );
}
