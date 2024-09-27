import React from 'react';
import Modal from 'react-modal';

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmar acción"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>¿Estás seguro?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="button-group">
                <button onClick={onConfirm}>Confirmar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </Modal>
    );
}