<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        // Obtener todos los tickets
        return Ticket::all();
    }

    public function store(Request $request)
    {
        // Validar y crear un ticket
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'difficulty' => 'required|in:easy,medium,hard',
            'gif_url' => 'required|url',
            'completed' => 'boolean',
        ]);

        return Ticket::create($validated);
    }

    public function show(Ticket $ticket)
    {
        // Mostrar un ticket específico
        return $ticket;
    }

    public function update(Request $request, Ticket $ticket)
    {
        // Validar y actualizar un ticket
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'difficulty' => 'required|in:easy,medium,hard',
            'gif_url' => 'required|url',
            'completed' => 'boolean',
        ]);

        $ticket->update($validated);
        return $ticket;
    }

    public function destroy(Ticket $ticket)
    {
        // Eliminar un ticket
        $ticket->delete();
        return response()->noContent();
    }
}
