import React, { useState, useEffect } from "react";

import search from "../assets/search.svg";
import edit from "../assets/edit.svg";
import del from "../assets/delete.svg";

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
  const [dataTemp, setDataTemp] = useState<RowData[]>([]);
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    setData([
      { id: 1, item: "aaa", price: 1230, date: "31/02/2024", status: 0 },
      { id: 2, item: "bbb", price: 1230, date: "31/02/2024", status: 0 },
      { id: 3, item: "cccc", price: 1230, date: "31/02/2024", status: 0 },
    ]);
    setDataTemp([
      { id: 1, item: "aaa", price: 1230, date: "31/02/2024", status: 0 },
      { id: 2, item: "bbb", price: 1230, date: "31/02/2024", status: 0 },
      { id: 3, item: "cccc", price: 1230, date: "31/02/2024", status: 0 },
    ]);
  }, []);

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

  const handleSearch = (input: string) => {
    if (input === "") {
      setData(dataTemp);
    } else {
      const newFilteredData = data.filter((row) =>
        row.item.toLowerCase().includes(input.toLowerCase())
      );

      setData(newFilteredData);
    }
  };

  const handleDeleteRow = (id: number) => {
    const newFilteredData = data.filter((row) => row.id !== id);

    setData(newFilteredData);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row border-2 w-full h-12">
        <input
          type="text"
          placeholder="Search"
          className="bg-white p-2 w-full text-black focus:outline-none"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <img src={search} alt="search" className="mx-2 my-auto w-5" />
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
              <td className="p-2 border-b">
                <span className="border-2 bg-gray-200 px-3 py-1 rounded-2xl text-sm text-white">
                  {row.status === 0 ? "Not Done" : "Done"}
                </span>
              </td>
              <td className="flex flex-row p-2 border-b">
                <button>
                  <img
                    src={edit}
                    alt=""
                    className="hover:bg-gray-300 mx-1 p-2 hover:rounded-full w-8 hover:cursor-pointer"
                  />
                </button>
                <button onClick={() => handleDeleteRow(row.id)}>
                  <img
                    src={del}
                    alt=""
                    className="hover:bg-gray-300 mx-1 p-2 hover:rounded-full w-8 hover:cursor-pointer"
                  />
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
