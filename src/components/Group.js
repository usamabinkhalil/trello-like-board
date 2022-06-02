import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";

function Group({ groupName, groupedTasks, users, status, setTask }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: groupName }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let backgroundColor = "bg-light";
  if (isOver) {
    backgroundColor = "bg-secondary";
  }

  return (
    <div className="col-sm-4 ">
      <div ref={drop} className={`card ${backgroundColor}`}>
        <div className="card-body">
          <h5 className="card-title text-center mb-2">{groupName}</h5>
          {groupedTasks[groupName] &&
            groupedTasks[groupName].map((task) => (
              <Task
                key={task.id}
                users={users}
                status={status}
                task={task}
                setTask={setTask}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Group;
