<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RoomResult
 *
 * @property int $id
 * @property int $room_id
 * @property string $name
 * @property int $invalid_attempts
 * @property int $completion_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\RoomResultFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereCompletionTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereInvalidAttempts($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomResult whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RoomResult extends Model
{
	use HasFactory;

	protected $guarded = [];
}
