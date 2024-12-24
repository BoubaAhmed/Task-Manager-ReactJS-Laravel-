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

    // Remove a task assignment from a user
    public function destroy($userId, $taskId)
    {
        $userTask = UserTask::where('user_id', $userId)->where('task_id', $taskId)->firstOrFail();
        $userTask->delete();
        return response()->json(null, 204);
    }
}
