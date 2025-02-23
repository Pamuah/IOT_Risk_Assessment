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
    <div className="overflow-x-auto mt-10">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>Variot id</th>
            <th>Title</th>
            <th>Sub Category</th>
            <th>Cvss Score</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-500 text-gray-100"
              }
            >
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>More info</td>
              <td>More info</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
