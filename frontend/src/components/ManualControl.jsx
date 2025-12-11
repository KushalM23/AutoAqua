import { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

export default function ManualControl({ irrigationActive, setIrrigationActive }) {
  const [showModal, setShowModal] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)

  const handleToggle = (action) => {
    setPendingAction(action)
    setShowModal(true)
  }

  const confirmAction = () => {
    setIrrigationActive(pendingAction === 'start')
    setShowModal(false)
    setPendingAction(null)
  }

  const cancelAction = () => {
    setShowModal(false)
    setPendingAction(null)
  }

  return (
    <div className="manual-control">
      <h2>Manual Irrigation Control</h2>
      <div className="control-panel">
        <div className="status-display">
          <div className="status-indicator">
            <div className={`status-light ${irrigationActive ? 'active' : 'inactive'}`}></div>
            <span className="status-text">
              {irrigationActive ? 'Irrigation Active' : 'Irrigation Inactive'}
            </span>
          </div>
          {irrigationActive && (
            <div className="active-timer">
              <span>Running for 5 min 32 sec</span>
            </div>
          )}
        </div>

        <div className="control-buttons">
          <button
            className={`control-btn start-btn ${irrigationActive ? 'disabled' : ''}`}
            onClick={() => handleToggle('start')}
            disabled={irrigationActive}
          >
            <span className="btn-text">Start Irrigation</span>
          </button>

          <button
            className={`control-btn stop-btn ${!irrigationActive ? 'disabled' : ''}`}
            onClick={() => handleToggle('stop')}
            disabled={!irrigationActive}
          >
            <span className="btn-text">Stop Irrigation</span>
          </button>
        </div>

        <div className="control-info">
          <p>Manual override will temporarily disable automatic scheduling</p>
        </div>
      </div>

      <ConfirmationModal
        show={showModal}
        action={pendingAction}
        onConfirm={confirmAction}
        onCancel={cancelAction}
      />
    </div>
  )
}
