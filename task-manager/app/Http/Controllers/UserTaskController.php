<?php

namespace App\Http\Controllers;

use App\Models\UserTask;
use Illuminate\Http\Request;

class UserTaskController extends Controller
{
    // Assign a task to a user
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'task_id' => 'required|exists:tasks,id',
            'assigned_date' => 'required|date',
        ]);

        $userTask = UserTask::create($request->all());

        return response()->json($userTask, 201);
    }

    // Fetch all tasks assigned to a user
    public function userTasks($userId)
    {
        $userTasks = UserTask::where('user_id', $userId)->get();

        if ($userTasks->isNotEmpty()) {
            return response()->json($userTasks);
        }

        return response()->json(['message' => 'No tasks assigned to this user'], 404);
    }

    // Remove a task assignment
    public function destroy($id)
    {
        $userTask = UserTask::find($id);

        if ($userTask) {
            $userTask->delete();
            return response()->json(['message' => 'UserTask assignment deleted']);
        }

        return response()->json(['message' => 'UserTask not found'], 404);
    }
}
