<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'status',
        'priority',
        'due_date',
    ];
    //(many-to-one)
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    //(many-to-many via user_tasks)
    public function users()
    {
        return $this->belongsToMany(User::class, 'user-tasks')->withPivot('assigned_date');
    }
}

