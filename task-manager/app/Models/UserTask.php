<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'user_tasks';

    // The attributes that are mass assignable.
    protected $fillable = [
        'user_id',
        'task_id',
        'assigned_date',
    ];

    // Define relationship with user (many-to-one)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define relationship with task (many-to-one)
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
