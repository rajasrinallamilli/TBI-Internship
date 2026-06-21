import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../components/ui";

function ComponentDemo() {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  return (

    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        Component Showcase
      </h1>

      <Button
        variant="primary"
        onClick={() => alert("Primary")}
      >
        Primary Button
      </Button>

      <Button variant="secondary">
        Secondary Button
      </Button>

      <Button variant="outline">
        Outline Button
      </Button>

      <Input
        label="Name"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <Button
        onClick={() => setOpen(true)}
      >
        Open Modal
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Booking Confirmation"
      >
        <p>Your booking is ready.</p>
      </Modal>

      <Toast />

      <Loader />

    </div>
  );
}

export default ComponentDemo;