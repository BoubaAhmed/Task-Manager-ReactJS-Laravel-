<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Fetch all tasks
    public function index()
    {
        return response()->json(Task::all());
    }

    // Fetch a single task by ID
    public function show($id)
    {
        $task = Task::find($id);

        if ($task) {
            return response()->json($task);
        }

        return response()->json(['message' => 'Task not found'], 404);
    }

    // Create a new task
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required',
            'status' => 'required|in:Pending,In Progress,Completed',
            'priority' => 'nullable|in:Low,Medium,High',
        ]);

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    // Update an existing task
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if ($task) {
            $request->validate([
                'name' => 'required',
                'status' => 'required|in:Pending,In Progress,Completed',
                'priority' => 'nullable|in:Low,Medium,High',
            ]);

            $task->update($request->all());

            return response()->json($task);
        }

        return response()->json(['message' => 'Task not found'], 404);
    }

    // Delete a task
    public function destroy($id)
    {
        $task = Task::find($id);

        if ($task) {
            $task->delete();
            return response()->json(['message' => 'Task deleted']);
        }

        return response()->json(['message' => 'Task not found'], 404);
    }
}
