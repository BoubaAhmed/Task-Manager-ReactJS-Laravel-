<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $fillable = [
        'username',
        'email',
        'first_name',
        'last_name',
        'phone_number',
        'role',
        'status',
    ];

    //(one-to-many)
    public function userTasks()
    {
        return $this->hasMany(UserTask::class);
    }

    //(many-to-many via user_tasks)
    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'user-tasks')->withPivot('assigned_date');
    }
}
