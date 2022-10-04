<?php

namespace App\Models;

use Domain\Room\Enums\RoomVisibilityEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Room
 *
 * @property int $id
 * @property int $room_type_id
 * @property int $user_id
 * @property string $name
 * @property string $description
 * @property RoomVisibilityEnum $visibility
 * @property string $access_code
 * @property \Carbon\CarbonImmutable|null $started_at
 * @property \Carbon\CarbonImmutable|null $ended_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RoomOpenEvent[] $openEvents
 * @property-read int|null $open_events_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Question[] $questions
 * @property-read int|null $questions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RoomResult[] $results
 * @property-read int|null $results_count
 * @property-read \App\Models\RoomType $roomType
 * @method static \Database\Factories\RoomFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room query()
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereAccessCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereEndedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereRoomTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereVisibility($value)
 * @mixin \Eloquent
 */
class Room extends Model
{
	use HasFactory;

	protected $guarded = [];

	protected $casts = [
		"visibility" => RoomVisibilityEnum::class,
		"started_at" => "immutable_datetime",
		"ended_at" => "immutable_datetime",
	];

	/**
	 * @return HasMany<Question>
	 */
	public function questions(): HasMany
	{
		return $this->hasMany(Question::class);
	}

	/**
	 * @return HasMany<RoomOpenEvent>
	 */
	public function openEvents(): HasMany
	{
		return $this->hasMany(RoomOpenEvent::class);
	}

	/**
	 * @return HasMany<RoomResult>
	 */
	public function results(): HasMany
	{
		return $this->hasMany(RoomResult::class);
	}

	public function roomType()
	{
		return $this->belongsTo(RoomType::class);
	}
}
