<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'users';

    // The attributes that are mass assignable.
    protected $fillable = [
        'username',
        'email',
        'first_name',
        'last_name',
        'phone_number',
        'role',
        'status',
    ];

    // Define relationship with user_tasks (one-to-many)
    public function userTasks()
    {
        return $this->hasMany(UserTask::class);
    }

    // Define relationship with tasks (many-to-many via user_tasks)
    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'user_tasks')->withPivot('assigned_date');
    }
}
