import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import ReactConfetti from 'react-confetti';
import TicketHeader from './TicketHeader';
import TicketFilters from './TicketFilters';
import TicketList from './TicketList';
import TicketForm from './TicketForm';
import TicketDetails from './TicketDetails';
import Pagination from '../Pagination';
import ConfirmationModal from '../ConfirmationModal';
import { useTicketContext, TicketProvider } from '@/Context/TicketContext';
import { filterTickets } from '@/utils/filterTickets';

Modal.setAppElement('#app');

function TicketManagerContent() {
    const { tickets, isLoading, filters, selectedTicket, setSelectedTicket, addTicket, updateTicket, toggleCompleted } = useTicketContext();
    const [showConfetti, setShowConfetti] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null, ticketId: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(5);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    const filteredTickets = useMemo(() => filterTickets(tickets, filters), [tickets, filters]);

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handleNewTicket = () => {
        setIsEditMode(false);
        setIsFormOpen(true);
    };

    const handleEditTicket = () => {
        setIsEditMode(true);
        setIsFormOpen(true);
    };

    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        if (isMobile) {
            setIsDetailsModalOpen(true);
        }
    };

    const handleSubmitTicket = async (ticketData) => {
        if (isEditMode) {
            const updatedTicket = await updateTicket(ticketData);
            if (selectedTicket && selectedTicket.id === updatedTicket.id) {
                setSelectedTicket(updatedTicket);
            }
        } else {
            await addTicket(ticketData);
        }
        setIsFormOpen(false);
        setIsEditMode(false);
    };

    const handleToggleCompleted = async (id) => {
        const updatedTicket = await toggleCompleted(id);
        if (updatedTicket && updatedTicket.completed) {
            setShowConfetti(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-300 to-white p-4 sm:p-6 lg:p-8">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            {showConfetti && (
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={200}
                />
            )}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            >
                <div className="p-6 sm:p-8">
                    <TicketHeader onNewTicket={handleNewTicket} />
                    <TicketFilters />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            {filteredTickets.length > 0 ? (
                                <>
                                    <TicketList
                                        tickets={currentTickets}
                                        onSelectTicket={handleSelectTicket}
                                        onToggleCompleted={handleToggleCompleted}
                                        setConfirmModal={setConfirmModal}
                                    />
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(filteredTickets.length / ticketsPerPage)}
                                        onPageChange={setCurrentPage}
                                    />
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-xl text-gray-600">No hay tickets creados en este momento.</p>
                                </div>
                            )}
                        </div>
                        {!isMobile && (
                            <div>
                                {selectedTicket && (
                                    <TicketDetails
                                        ticket={selectedTicket}
                                        onClose={() => setSelectedTicket(null)}
                                        onEdit={handleEditTicket}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            {isFormOpen && (
                <TicketForm
                    onClose={() => {
                        setIsFormOpen(false);
                        setIsEditMode(false);
                    }}
                    onSubmit={handleSubmitTicket}
                    isEditMode={isEditMode}
                    initialTicket={isEditMode ? selectedTicket : null}
                />
            )}
            <Modal
                isOpen={isMobile && isDetailsModalOpen}
                onRequestClose={() => setIsDetailsModalOpen(false)}
                contentLabel="Detalles del Ticket"
                className="modal"
                overlayClassName="overlay"
            >
                {selectedTicket && (
                    <TicketDetails
                        ticket={selectedTicket}
                        onClose={() => setIsDetailsModalOpen(false)}
                        onEdit={() => {
                            setIsEditMode(true);
                            setIsFormOpen(true);
                            setIsDetailsModalOpen(false);
                        }}
                    />
                )}
            </Modal>
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, action: null, ticketId: null })}
                onConfirm={() => {
                    confirmModal.action();
                    setConfirmModal({ isOpen: false, action: null, ticketId: null });
                }}
            />
        </div>
    );
}

export default function TicketManager() {
    return (
        <TicketProvider>
            <TicketManagerContent />
        </TicketProvider>
    );
}