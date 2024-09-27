import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTickets } from '@/hooks/useTickets';

const TicketContext = createContext();

export function TicketProvider({ children }) {
    const { tickets, isLoading, addTicket, updateTicket, deleteTicket, toggleCompleted: apiToggleCompleted } = useTickets();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filters, setFilters] = useState({
        status: 'all',
        difficulty: 'all',
        sortBy: 'newest'
    });

    const toggleCompleted = useCallback(async (id) => {
        const updatedTicket = await apiToggleCompleted(id);
        if (updatedTicket) {
            setSelectedTicket(prevSelected => 
                prevSelected && prevSelected.id === id ? updatedTicket : prevSelected
            );
        }
        return updatedTicket;
    }, [apiToggleCompleted]);

    const value = {
        tickets,
        isLoading,
        addTicket,
        updateTicket,
        deleteTicket,
        toggleCompleted,
        selectedTicket,
        setSelectedTicket,
        filters,
        setFilters
    };

    return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}

export function useTicketContext() {
    return useContext(TicketContext);
}