<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'tasks';

    // The attributes that are mass assignable.
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'status',
        'priority',
        'due_date',
    ];

    // Define relationship with project (many-to-one)
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Define relationship with users (many-to-many via user_tasks)
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_tasks')->withPivot('assigned_date');
    }
}

