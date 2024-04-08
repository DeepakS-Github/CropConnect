import React from "react";

function TableSkeleton({ rows = 10 }) {
  return (
    <>
      <div className="relative overflow-x-auto  w-full mx-auto rounded">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <tbody>
            {Array(rows)
              .fill(0)
              .map((row, index) => (
                <tr
                  key={index}
                  className="bg-gray-300 animate-pulse border-b border-white"
                >
                  <th
                    scope="row"
                    className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap"
                  ></th>
                  <td className="px-6 py-5"></td>
                  <td className="px-6 py-5"></td>
                  <td className="px-6 py-5"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableSkeleton;
