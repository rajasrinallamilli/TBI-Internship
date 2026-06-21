import { toast } from "react-hot-toast";

function Toast() {

  return (
    <button
      onClick={() =>
        toast.success("Action Successful!")
      }
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Show Toast
    </button>
  );
}

export default Toast;