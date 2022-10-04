<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\QuestionAnswer
 *
 * @property int $id
 * @property int $question_id
 * @property string $answer
 * @property bool $is_correct
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\QuestionAnswerFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer query()
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer whereIsCorrect($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer whereQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QuestionAnswer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuestionAnswer extends Model
{
	use HasFactory;

	protected $guarded = [];

	protected $casts = [
		"is_correct" => "bool",
	];
}
