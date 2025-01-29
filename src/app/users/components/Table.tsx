import React from "react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface TableComponentProps {
  data: User[]; // ✅ Ensure `data` is an array of user objects
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableComponent;
