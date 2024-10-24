import React from "react";

const Table = ({ tr, guest }) => {
  const trStyle =
    "pb-2 pt-2 pl-4 pr-4 text-lg text-start font-normal whitespace-nowrap border-2 border-[#E9EBED] tracking-wider";
  const tdStyle =
    "p-4 text-sm text-gray-600 whitespace-nowrap text-center border-2 border-[#E9EBED] tracking-wider";
  // bg-[#eff6ff]
  // const arr = [1, 2, 23, 3, 2, 2, 2, 2, 2, 2, 2, , 2,]
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className="w-full overflow-x-scroll md:overflow-x-auto bg-white h-[25rem] ">
      {guest?.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="">
              {tr?.map((item, index) => (
                <th key={index + 100} className={trStyle}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {guest.map((item, index) => (
              <tr key={index}>
                <td className={tdStyle}>{item?.name}</td>
                <td className={tdStyle}>{item?.gender}</td>
                <td className={tdStyle}>{item?.email}</td>
                <td className={tdStyle}>{item?.mobile}</td>
                <td className={tdStyle}>{formatDate(item?.updatedAt)}</td>
                <td className={tdStyle}>{item?._id}</td>
                <td className={tdStyle}>{!item?.member ? "No" : "Yes"}</td>
                <td className={tdStyle}>
                  {!item?.birthdayReminded ? "No" : "Yes"}
                </td>
                {/* <td className={tdStyle + ' cursor-pointer'}>More</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="flex justify-center items-center h-[100%] text-lg">
          NO GUEST FOUND
        </h1>
      )}
    </div>
  );
};

export default Table;
