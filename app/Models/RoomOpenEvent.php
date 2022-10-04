<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RoomOpenEvent
 *
 * @property int $id
 * @property int $room_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\RoomOpenEventFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomOpenEvent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RoomOpenEvent extends Model
{
    use HasFactory;

    protected $guarded = [];
}
