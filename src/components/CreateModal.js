import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";

function CreateModal({ users, status, task, setTask }) {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [validate, setValidate] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setData(
      task.id
        ? cloneDeep(task)
        : { title: "", description: "", status: "", assignedUser: "" }
    );
    setShow(true);
  };

  const setFormData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = () => {
    if (!data.title || !data.status) {
      setValidate(false);
    } else {
      setTask({ ...data });
      handleClose();
    }
  };

  return (
    <>
      {task.id ? (
        <FiEdit
          onClick={handleShow}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer",
            color: "blue",
          }}
        />
      ) : (
        <Button variant="primary" onClick={handleShow} className="mb-4">
          Create issue
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={(e) => setFormData("title", e.target.value)}
                defaultValue={data.title}
              />
              <div
                className="invalid-feedback"
                style={{
                  display: validate ? "none" : "block",
                }}
              >
                Title is required
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setFormData("description", e.target.value)}
                defaultValue={data.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setFormData("status", e.target.value)}
                defaultValue={data.status}
              >
                <option>Status</option>
                {status.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Form.Select>
              <div
                className="invalid-feedback"
                style={{
                  display: validate ? "none" : "block",
                }}
              >
                Status is required
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Assigned user</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setFormData("assignedUser", e.target.value)}
                defaultValue={data.assignedUser}
              >
                <option>Assigned user</option>
                {users.map((user) => (
                  <option key={user}>{user}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
