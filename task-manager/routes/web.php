<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTaskController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});



// Group API-like routes under 'api' middleware (for token authentication, etc.)
Route::prefix('api')->middleware('api')->group(function () {
    Route::resource('tasks', TaskController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('users', UserController::class);
    Route::resource('user-tasks', UserTaskController::class);
})->withoutMiddleware([VerifyCsrfToken::class]);;

