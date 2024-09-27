import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error('Error al cargar los tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const addTicket = async (newTicket) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/tickets', newTicket);
      setTickets([...tickets, response.data]);
      toast.success('Ticket creado exitosamente');
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error('Error al crear el ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async (updatedTicket) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/tickets/${updatedTicket.id}`, updatedTicket);
      setTickets(tickets.map(ticket => ticket.id === updatedTicket.id ? response.data : ticket));
      return response.data;
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error('Error al actualizar el ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTicket = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/tickets/${id}`);
      setTickets(tickets.filter(ticket => ticket.id !== id));
      toast.success('Ticket eliminado exitosamente');
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error('Error al eliminar el ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompleted = async (id) => {
    const ticket = tickets.find(ticket => ticket.id === id);
    const updatedTicket = { ...ticket, completed: !ticket.completed };
    const result = await updateTicket(updatedTicket);
    if (result) {
      if (result.completed) {
        toast.success('¡Ticket completado!');
      } else {
        toast.info('Ticket marcado como pendiente');
      }
    }
    return result;
  };

  return { tickets, isLoading, addTicket, updateTicket, deleteTicket, toggleCompleted };
}