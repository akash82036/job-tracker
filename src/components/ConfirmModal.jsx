function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
