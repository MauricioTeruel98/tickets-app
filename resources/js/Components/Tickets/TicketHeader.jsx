import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';

export default function TicketHeader({ onNewTicket }) {
    return (
        <div className="md:flex justify-between items-center mb-6">
            <h1 className="mb-3 md:mb-0 text-3xl font-bold text-gray-900">Gestor de Tickets</h1>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNewTicket}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Nuevo Ticket
            </motion.button>
        </div>
    );
}