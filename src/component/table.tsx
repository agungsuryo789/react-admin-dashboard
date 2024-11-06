import React, { useState } from "react";

interface RowData {
  id: number;
  item: string;
  price: number;
  date: string;
  status: number;
}

const Table: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState<RowData[]>([
    { id: 1, item: "item lorem", price: 1230, date: "31/02/2024", status: 0 },
    { id: 2, item: "item lorem", price: 1230, date: "31/02/2024", status: 0 },
    { id: 3, item: "item lorem", price: 1230, date: "31/02/2024", status: 0 },
  ]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row border-2 w-full h-12">
        <input
          type="text"
          placeholder="Search"
          className="bg-white p-2 w-full text-black focus:outline-none"
        />
        <img src="" alt="search" className="my-auto w-8" />
      </div>
      <table className="border-collapse border-gray-200 border min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border-b text-left">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="bg-white w-5 h-5"
              />
            </th>
            <th className="p-2 border-b text-left">Item</th>
            <th className="p-2 border-b text-left">Price</th>
            <th className="p-2 border-b text-left">Date</th>
            <th className="p-2 border-b text-left">Status</th>
            <th className="p-2 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="bg-white p-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleSelectRow(row.id)}
                  className="bg-white w-5 h-5"
                />
              </td>
              <td className="p-2 border-b">{row.item}</td>
              <td className="p-2 border-b">{row.price}</td>
              <td className="p-2 border-b">{row.date}</td>
              <td className="p-2 border-b">{row.status}</td>
              <td className="flex flex-row p-2 border-b">
                <button className="border-2 mx-1 p-2 rounded-full">edit</button>
                <button className="border-2 mx-1 p-2 rounded-full">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
