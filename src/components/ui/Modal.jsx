import { useEffect, useRef } from "react";

/**
 * Modal Component
 *
 * Props:
 * isOpen
 * onClose
 * title
 * children
 */

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the modal when it opens
    modalRef.current?.focus();

    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }

      // Trap focus inside the modal
      if (e.key === "Tab") {
        e.preventDefault();
        modalRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white p-6 rounded-xl shadow-lg w-96 outline-none"
      >
        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>

        {children}

        <button
          onClick={onClose}
          className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;