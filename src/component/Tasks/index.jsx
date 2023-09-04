import React, { useState } from "react";
import styles from "./styles.module.scss";
import NormalButton from "../Common/NormalButton";
import ReactSelect from "react-select";
import NormalTable from "../Common/NormalTable";
import { addTask, deleteTask, toggleTask, setFilter } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

const Tasks = () => {
  const headers = ["Sl.No", "Tasks", "Status", "Action"];
  const [newTaskText, setNewTaskText] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  console.log(filter, "filter");
  const dispatch = useDispatch();

  const filterOptions = [
    {
      label: "All",
      value: "SHOW_ALL",
    },
    {
      label: "Completed",
      value: "SHOW_COMPLETED",
    },
    {
      label: "Active",
      value: "SHOW_ACTIVE",
    },
  ];

  const filteredTasks = tasks.tasks.filter((task) => {
    if (filter === "SHOW_COMPLETED") {
      return task.completed;
    } else if (filter === "SHOW_ACTIVE") {
      return !task.completed;
    }
    return true;
  });

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;
    dispatch(addTask({ text: newTaskText, completed: false }));
    setNewTaskText();
    setShow(false);
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <>
      <div className="mx-5 px-5">
        <p className={styles.title}>Building a Task Management App </p>

        <div className="my-5">
          <div className="row">
            <div className="col-6">
              <label className={styles.filterTitle}>Filter</label>
              <ReactSelect
                className="col-6"
                placeholder="Select Filter"
                options={filterOptions}
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
              />
            </div>
            <div className="col-6 text-end">
              <NormalButton
                className="primaryButton mt-4"
                label="Add Tasks"
                onClick={handleShow}
              />
            </div>
          </div>
        </div>
        <NormalTable headers={headers}>
          {filteredTasks.length > 0 ? (
            <>
              {filteredTasks.map((x, index) => {
                return (
                  <tr key={x?.id}>
                    <td>{index + 1}</td>
                    <td>{x?.text}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={x.completed}
                        onChange={() => handleToggleTask(x.id)}
                      />
                    </td>
                    <td>
                      <NormalButton
                        className="dangerButton"
                        label="Delete"
                        onClick={() => handleDeleteTask(x.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <td className="text-center" colSpan={4}>
              <p>No Data</p>
            </td>
          )}
        </NormalTable>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <label>Add New Task</label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Task</label>
            <input
              type="text"
              placeholder="Task text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className={styles}
            />
          </div>
          <div>
            <NormalButton
              className="primaryButton"
              label="Add"
              onClick={handleAddTask}
            />
            <NormalButton
              className="button-outline"
              label="Cancel"
              onClick={handleClose}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Tasks;
