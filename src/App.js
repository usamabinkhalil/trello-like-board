import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateModal from "./components/CreateModal";
import { findIndex, groupBy } from "lodash";
import Group from "./components/Group";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status: "Todo",
      assignedUser: "",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status: "In Progress",
      assignedUser: "",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      status: "Done",
      assignedUser: "",
    },
  ]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    assignedUser: "",
  });
  const [groupedTasks, setGroupedTasks] = useState({});
  const users = ["JD", "AJ", "SS"];
  const status = ["Todo", "In Progress", "Done"];

  useEffect(() => {
    const groupedTasks = groupBy(tasks, "status");
    setGroupedTasks(groupedTasks);
  }, [tasks]);

  useEffect(() => {
    console.log(task);
    if (task.title && task.status) {
      const taskIndex = findIndex(tasks, { id: task.id });
      if (taskIndex > -1) {
        const newTasks = [...tasks];
        newTasks[taskIndex] = task;
        setTasks(newTasks);
      } else {
        task.id = tasks.length + 1;
        setTasks([...tasks, task]);
      }
    }
  }, [task]);

  return (
    <div className="container-filuid px-5 py-4">
      <CreateModal
        users={users}
        status={status}
        task={{ title: "", description: "", status: "", assignedUser: "" }}
        setTask={setTask}
      />
      <div className="row">
        {status.map((groupName) => (
          <Group
            key={groupName}
            groupName={groupName}
            groupedTasks={groupedTasks}
            users={users}
            status={status}
            setTask={setTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
