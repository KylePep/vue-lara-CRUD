<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bucketItem extends Model
{
    use HasFactory;

    protected $fillable = ['creator_id','bucket_id', 'item_id', 'checked'];
    
    public function bucket()
    {
        return $this->belongsTo(bucket::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

}
