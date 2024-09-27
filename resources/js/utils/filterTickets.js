export function filterTickets(tickets, filters) {
    let result = [...tickets];

    if (filters.status !== 'all') {
        result = result.filter(ticket =>
            filters.status === 'completed' ? ticket.completed : !ticket.completed
        );
    }

    if (filters.difficulty !== 'all') {
        result = result.filter(ticket => ticket.difficulty === filters.difficulty);
    }

    if (filters.sortBy === 'newest') {
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filters.sortBy === 'oldest') {
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return result;
}