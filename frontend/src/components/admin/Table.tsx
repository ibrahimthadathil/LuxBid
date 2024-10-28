import React from 'react';

const Table: React.FC = () => {
  return (
    <div className="table-container overflow-x-auto bg-gray-800 rounded-lg p-4 text-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900">
            <th className="p-2 text-left">No</th>
            <th className="p-2 text-left">User name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Created At</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Participants</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-gray-800 even:bg-gray-700">
            <td className="p-2">LB01</td>
            <td className="p-2 text-blue-500"><a href="#">John Samuel</a></td>
            <td className="p-2">john@gmail.com</td>
            <td className="p-2">12/03/2023</td>
            <td className="p-2 text-green-500">Active</td>
            <td className="p-2">
              <button className="bg-gray-700 px-4 py-2 rounded text-white">View</button>
            </td>
          </tr>
          <tr className="odd:bg-gray-800 even:bg-gray-700">
            <td className="p-2">LB02</td>
            <td className="p-2 text-blue-500"><a href="#">Peter Orlam</a></td>
            <td className="p-2">peter@gmail.com</td>
            <td className="p-2">12/03/2023</td>
            <td className="p-2 text-red-500">Blocked</td>
            <td className="p-2">
              <button className="bg-gray-700 px-4 py-2 rounded text-white">View</button>
            </td>
          </tr>
          <tr className="odd:bg-gray-800 even:bg-gray-700">
            <td className="p-2">LB03</td>
            <td className="p-2 text-blue-500"><a href="#">Abraham Philip</a></td>
            <td className="p-2">abraham@gmail.com</td>
            <td className="p-2">12/03/2023</td>
            <td className="p-2 text-green-500">Active</td>
            <td className="p-2">
              <button className="bg-gray-700 px-4 py-2 rounded text-white">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
