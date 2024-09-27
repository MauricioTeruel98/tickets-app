import React from 'react';
import { FilterIcon } from 'lucide-react';
import { useTicketContext } from '@/Context/TicketContext';

export default function TicketFilters() {
    const { filters, setFilters } = useTicketContext();

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center">
                    <FilterIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-gray-700 font-medium">Filtros:</span>
                </div>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md py-2 text-sm"
                >
                    <option value="all">Todos</option>
                    <option value="completed">Completados</option>
                    <option value="pending">Pendientes</option>
                </select>
                <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md py-2 text-sm"
                >
                    <option value="all">Todas las dificultades</option>
                    <option value="easy">Fácil</option>
                    <option value="medium">Media</option>
                    <option value="hard">Difícil</option>
                </select>
                <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="bg-white border border-gray-300 rounded-md py-2 text-sm"
                >
                    <option value="newest">Más recientes</option>
                    <option value="oldest">Más antiguos</option>
                </select>
            </div>
        </div>
    );
}