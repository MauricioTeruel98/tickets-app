import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

const TicketForm = ({ onClose, onSubmit, isEditMode, initialTicket }) => {
  const { props } = usePage();
  const [ticket, setTicket] = useState(initialTicket || {
    name: '',
    description: '',
    difficulty: 'medium',
    gif_url: '',
    completed: false,
  });

  useEffect(() => {
    if (initialTicket) {
      setTicket(initialTicket);
    }
  }, [initialTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gifUrl = await fetchGif(ticket.difficulty);
      onSubmit({ ...ticket, gif_url: gifUrl });
    } catch (error) {
      console.error("Error fetching GIF:", error);
      toast.error('No se pudo obtener un GIF. El ticket se creará sin imagen.');
      onSubmit(ticket);
    }
  };

  const fetchGif = async (difficulty) => {
    const apiKey = props.giphyApiKey;
    if (!apiKey) {
      toast.error('No se ha configurado la API key de Giphy. Por favor, contacte al administrador.');
      throw new Error('Giphy API key not found');
    }

    let searchTerm;
    switch (difficulty) {
      case 'easy':
        searchTerm = 'nice';
        break;
      case 'medium':
        searchTerm = 'alert';
        break;
      case 'hard':
        searchTerm = 'danger';
        break;
      default:
        searchTerm = 'neutral';
    }

    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchTerm}`);
      const data = await response.json();
      if (data.data && data.data.images && data.data.images.fixed_height) {
        return data.data.images.fixed_height.url;
      } else {
        throw new Error('Invalid Giphy API response');
      }
    } catch (error) {
      console.error("Error fetching GIF from Giphy:", error);
      throw error;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Editar Ticket' : 'Nuevo Ticket'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={ticket.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={ticket.description}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Dificultad</label>
            <select
              id="difficulty"
              name="difficulty"
              value={ticket.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="easy">Fácil</option>
              <option value="medium">Media</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditMode ? 'Actualizar' : 'Crear'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TicketForm;