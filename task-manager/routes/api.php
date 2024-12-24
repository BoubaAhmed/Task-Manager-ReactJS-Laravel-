<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTaskController;
use Illuminate\Support\Facades\Route;

// Project routes
Route::apiResource('projects', ProjectController::class);

// Task routes
Route::apiResource('tasks', TaskController::class);

// User routes
Route::apiResource('users', UserController::class);

// User-Task association routes
Route::post('user-tasks', [UserTaskController::class, 'store']);
Route::delete('user-tasks/{userId}/{taskId}', [UserTaskController::class, 'destroy']);
