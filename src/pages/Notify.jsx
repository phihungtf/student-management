import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegCheckSquare, FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
const pathPost = "http://localhost:8080/notification/acp/user?status=";

/**
 * This page shows the marks of all students with a specific subject.
 * It also allows the user to update the marks of a student
 * @returns JSX.Element as a page
 */
export default function Notify() {
  let [notify, setNotify] = useState([]);
  let getData = async () => {
    return axios
      .get("http://localhost:8080/user/list")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        window.location.href = "/NotFound";
      });
  };
  let checked = [];
  function handleCheck(e) {
    console.log(e.target.checked);
    if (e.target.checked) {
      checked.includes(notify[e.target.name])
        ? ""
        : checked.push(notify[e.target.name]);
    } else {
      checked.includes(notify[e.target.name])
        ? (checked = checked.filter((item) => item !== notify[e.target.name]))
        : "";
    }
    console.log(checked);
  }
  function handleAccept() {
    checked.forEach((item) => {
      console.log(item.username);
      axios.patch(
        `http://localhost:8080/user/accept?username=${item.username}`
      );
      window.location.reload();
    });
  }
  useEffect(() => {
    let temp = [];
    getData().then((res) => {
      temp = res.data;
      temp = temp.filter((item) => !item.acp);
      if (temp) setNotify(temp.reverse());
    });
  }, []);
  const data = {
    column_names: ["STT", "User", "Content", "Check"],
    rows: notify,
  };
  return (
    <div className="flex flex-col items-center pt-10 w-full h-full">
      <h1 className="text-4xl font-bold m-5 text-violet-700">Notification</h1>
      <div className="overflow-y-auto min-w-min shadow-md sm:rounded-lg h-3/5 ">
        <table className=" text-sm text-left text-violet-500  ">
          <thead className="text-base text-violet-700 uppercase bg-violet-300">
            <tr>
              {data.column_names.map((name) => {
                return (
                  <th
                    scope="col"
                    key={name}
                    className="py-3 px-12
                  "
                  >
                    {name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => {
              return (
                <tr
                  className="bg-violet-100 border-b hover:bg-violet-400 text-center "
                  key={`columns-${index}`}
                >
                  <td
                    scope="row"
                    className="py-4 px-12
                     font-medium text-violet-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-12
                     font-medium text-violet-900 whitespace-nowrap"
                  >
                    {row.username}
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-12 font-medium text-violet-900 whitespace-nowrap"
                  >
                    {row.username} muốn tham gia vào hệ thống
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-12
                     font-medium text-violet-900 whitespace-nowrap"
                  >
                    <input
                      type="checkbox"
                      className="inline-block w-4 h-4"
                      name={index}
                      onChange={handleCheck}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="bg-violet-500 mt-3 rounded mr-2 hover:bg-violet-700 text-white shadow-md"
          onClick={handleAccept}
        >
          <div className=" m-1 p-2.5 flex items-center px-4 duration-300 cursor-pointer ">
            {<FaRegCheckSquare size={30} />}
            <span className="sidebar-icon-text px-2">Chấp nhận</span>
          </div>
        </button>
      </div>
    </div>
  );
}
