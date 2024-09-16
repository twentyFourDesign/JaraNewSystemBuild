import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { baseUrl } from "../../../../constants/baseurl";
import { FaTrash } from "react-icons/fa";
const Popup = ({ setShowPopup, setData }) => {
  const [heading, setHeading] = useState("");
  const [tasks, setTasks] = useState([{ title: "" }]);
  const handleTaskChange = (index, event) => {
    const newTasks = tasks.slice();
    newTasks[index].title = event.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { title: "" }]);
  };
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${baseUrl}/task/create`,
          {
            heading,
            tasks,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status) {
            toast.success("Task Created");
            axios.get(`${baseUrl}/task/get`).then((res) => {
              setData(res?.data);
            });
            setTimeout(() => {
              setShowPopup(false);
            }, 3000);
          } else {
            toast.error("Something went wrong");
          }
        });

      setShowPopup(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <div className="p-5 bg-white w-[20rem] rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-robotoFont">Create New Tasks</h1>
        <ImCross onClick={() => setShowPopup(false)} />
      </div>
      <form onSubmit={handleCreateTask}>
        <div className="mb-4">
          <label className="block text-gray-700">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {tasks.map((task, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Task {index + 1}</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleTaskChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <FaTrash
                onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Another Task
        </button>

        <button
          type="submit"
          className="mt-4 w-[100%] h-[2.5rem] font-bold rounded-md text-white font-cursive bg-blue-800"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default Popup;
