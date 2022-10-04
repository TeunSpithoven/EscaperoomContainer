<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\RoomType
 *
 * @property int $id
 * @property string $identifier
 * @property string $label
 * @property int $question_count
 * @property string $rgb_color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Room[] $rooms
 * @property-read int|null $rooms_count
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereIdentifier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereQuestionCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereRgbColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RoomType extends Model
{
	use HasFactory;

	protected $guarded = [];

	public function rooms(): HasMany
	{
		return $this->hasMany(Room::class);
	}
}
