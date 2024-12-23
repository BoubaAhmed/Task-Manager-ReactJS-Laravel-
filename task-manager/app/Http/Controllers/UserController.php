<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Fetch all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Fetch a single user by ID
    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    // Create a new user
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'role' => 'required|in:Designer,Developer,Tester',
            'status' => 'required|in:Active,Inactive',
        ]);

        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    // Update an existing user
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if ($user) {
            $request->validate([
                'username' => 'unique:users,username,' . $id,
                'email' => 'email|unique:users,email,' . $id,
                'first_name' => 'required',
                'last_name' => 'required',
                'role' => 'required|in:Designer,Developer,Tester',
                'status' => 'required|in:Active,Inactive',
            ]);

            $user->update($request->all());

            return response()->json($user);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
