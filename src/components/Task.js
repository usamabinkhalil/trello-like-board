import React from "react";
import CreateModal from "./CreateModal";
import { useDrag } from "react-dnd";

function Task({ users, status, task, setTask }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { name: task.title },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`);
        setTask({ ...task, status: dropResult.name });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={drag}
      className="card mb-2"
      style={{ opacity }}
      data-testid={`box`}
    >
      <div className="card-body">
        <CreateModal
          users={users}
          status={status}
          task={task}
          setTask={setTask}
        />
        <h5 className="card-title ">{task.title}</h5>
        <p className="card-text">{task.description}</p>
      </div>
    </div>
  );
}

export default Task;
