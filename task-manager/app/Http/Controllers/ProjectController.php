<?php
namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Fetch all projects
    public function index()
    {
        return response()->json(Project::all());
    }

    // Fetch a single project by ID
    public function show($id)
    {
        $project = Project::find($id);

        if ($project) {
            return response()->json($project);
        }

        return response()->json(['message' => 'Project not found'], 404);
    }

    // Create a new project
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'start_date' => 'required|date',
            'status' => 'required|in:Active,Completed,On Hold',
        ]);

        $project = Project::create($request->all());

        return response()->json($project, 201);
    }

    // Update an existing project
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if ($project) {
            $request->validate([
                'name' => 'required',
                'start_date' => 'required|date',
                'status' => 'required|in:Active,Completed,On Hold',
            ]);

            $project->update($request->all());

            return response()->json($project);
        }

        return response()->json(['message' => 'Project not found'], 404);
    }

    // Delete a project
    public function destroy($id)
    {
        $project = Project::find($id);

        if ($project) {
            $project->delete();
            return response()->json(['message' => 'Project deleted']);
        }

        return response()->json(['message' => 'Project not found'], 404);
    }
}
