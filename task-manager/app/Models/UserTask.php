<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{
    use HasFactory;
    protected $table = 'user-tasks';
    protected $fillable = [
        'user_id',
        'task_id',
        'assigned_date',
    ];
    // (many-to-one)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //(many-to-one)
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
