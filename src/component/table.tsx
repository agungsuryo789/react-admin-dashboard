import React, { useState, useEffect } from "react";

import TableSearch from "./tableSearch";
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
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    /* fetch data on page load */
    fetchData();
  }, []);

  /* checbox select all */
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  /* checbox select 1 row */
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

  const handleDeleteRow = async (id: number) => {
    try {
      const res = await fetch("https://dummyjson.com/products/" + id, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      if (res.status === 200) alert("success");
      const newFilteredData = data.filter((row) => row.id !== id);
      setData(newFilteredData);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const datares = await res.json();
      const mappeddata = datares.products.map((item: any) => ({
        id: item.id,
        item: item.title,
        price: item.price,
        date: item.meta.updatedAt,
        status: item.shippingInformation,
      }));
      setData(mappeddata);
      setDataTemp(mappeddata);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    }
  };

  function handleDeleteAll() {
    setData((prevData) =>
      prevData.filter((item) => !selectedRows.includes(item.id))
    );
    setSelectedRows([]);
  }

  function handleEdit(id: number) {
    setEdit(true);
    setEditData(id);
  }

  /* handle edit title row data */
  function handleSaveEdit() {
    if (editedTitle === "") return;

    try {
      fetch("https://dummyjson.com/products/" + editData, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
        }),
      })
        .then((res) => res.json())
        .then(() => {
			alert('success')
			setEditedTitle('')
			setEditData(null)
			setEdit(false)
		});
    } catch (error) {
      console.log("🚀 ~ handleSaveEdit ~ error:", error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <TableSearch onChange={handleSearch} />
      <table className="border-collapse border-gray-200 border min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="flex flex-row p-2 border-b text-left">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="bg-white my-auto w-5 h-5"
              />
              {selectedRows.length > 0 ? (
                <button className="my-auto" onClick={handleDeleteAll}>
                  <img
                    src={del}
                    alt=""
                    className="hover:bg-gray-300 mx-1 p-2 hover:rounded-full w-8 hover:cursor-pointer"
                  />
                </button>
              ) : null}
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
              <td className="p-2 border-b text-sm">{row.item}</td>
              <td className="p-2 border-b text-sm">${row.price}</td>
              <td className="p-2 border-b text-sm">
                {new Date(row.date).toLocaleDateString()}
              </td>
              <td className="p-2 border-b">
                <span className="bg-blue-400 xl:px-3 xl:py-1 p-1 rounded-2xl text-nowrap text-sm text-white">
                  {row.status}
                </span>
              </td>
              <td className="flex flex-row p-2 border-b">
                <button onClick={() => handleEdit(row.id)}>
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

      {isEdit ? (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-lg p-6 rounded-lg w-96">
            <h2 className="mb-4 font-semibold text-gray-800 text-lg">
              Edit Item
            </h2>

            <input
              type="text"
              placeholder="Type here..."
              className="mb-4 px-4 py-2 border rounded-lg w-full focus:outline-none bg-white text-black"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-gray-700"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
