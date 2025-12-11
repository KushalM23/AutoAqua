export default function ConfirmationModal({ show, action, onConfirm, onCancel }) {
  if (!show) return null

  const isStart = action === 'start'

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Confirm Action</h3>
        </div>
        <div className="modal-body">
          <p>
            Are you sure you want to <strong>{isStart ? 'START' : 'STOP'}</strong> irrigation manually?
          </p>
          <div className="modal-warning">
            {isStart ? (
              <>
                <p>This will:</p>
                <ul>
                  <li>Immediately activate the irrigation system</li>
                  <li>Override the automatic schedule</li>
                  <li>Continue until manually stopped</li>
                </ul>
              </>
            ) : (
              <>
                <p>This will:</p>
                <ul>
                  <li>Immediately stop the irrigation system</li>
                  <li>Override any scheduled irrigation</li>
                  <li>Remain off until manually restarted</li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button 
            className={`modal-btn confirm-btn ${isStart ? 'start' : 'stop'}`}
            onClick={onConfirm}
          >
            {isStart ? 'Start Irrigation' : 'Stop Irrigation'}
          </button>
        </div>
      </div>
    </div>
  )
}
