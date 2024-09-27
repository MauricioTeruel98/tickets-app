import React from 'react';
import { motion } from 'framer-motion';
import { XIcon, EditIcon } from 'lucide-react';

const TicketDetails = ({ ticket, onClose, onEdit }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{ticket.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <img
                    src={ticket.gif_url}
                    alt={`GIF for ${ticket.name}`}
                    className="w-full object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-4">{ticket.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        ticket.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {ticket.difficulty}
                    </span>
                    <span>Creado: {new Date(ticket.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                        ticket.completed ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {ticket.completed ? 'Completado' : 'Pendiente'}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEdit}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                        <EditIcon className="w-4 h-4 mr-1" />
                        Editar
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default TicketDetails;