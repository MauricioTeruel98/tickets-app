
import TicketManager from '@/Components/Tickets/TicketManager';
import { Head, Link } from '@inertiajs/react';

export default function Home() {

    return (
        <div className="overflow-x-hidden">
            <Head title="Tickets" />
            <TicketManager />
        </div>
    );
}
