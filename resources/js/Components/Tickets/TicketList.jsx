import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, TrashIcon } from 'lucide-react';
import { useTicketContext } from '@/Context/TicketContext';

export default function TicketList({ tickets, onSelectTicket, onToggleCompleted, setConfirmModal }) {
  const { deleteTicket } = useTicketContext();

  const handleToggleCompleted = (id) => {
    setConfirmModal({ 
      isOpen: true, 
      action: () => onToggleCompleted(id), 
      ticketId: id 
    });
  };

  const handleDeleteTicket = (id) => {
    setConfirmModal({ 
      isOpen: true, 
      action: () => deleteTicket(id), 
      ticketId: id 
    });
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <motion.div
          key={ticket.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4 sm:p-6 flex items-start">
            <img
              src={ticket.gif_url}
              alt={`GIF for ${ticket.name}`}
              className="w-16 h-16 rounded-full object-cover mr-4 flex-shrink-0"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{ticket.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  ticket.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {ticket.difficulty}
                </span>
                <span className="ml-2">{new Date(ticket.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-col items-center ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleToggleCompleted(ticket.id)}
                className={`p-1 rounded-full ${
                  ticket.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                {ticket.completed ? <CheckCircleIcon /> : <XCircleIcon />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteTicket(ticket.id)}
                className="p-1 rounded-full text-red-500 hover:text-red-600 mt-2"
              >
                <TrashIcon />
              </motion.button>
            </div>
          </div>
          <motion.button
            whileHover={{ backgroundColor: '#f3f4f6' }}
            onClick={() => onSelectTicket(ticket)}
            className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            Ver detalles
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}