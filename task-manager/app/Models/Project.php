<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $table = 'projects';
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'priority',
        'status',
    ];
    //(one-to-many)
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
