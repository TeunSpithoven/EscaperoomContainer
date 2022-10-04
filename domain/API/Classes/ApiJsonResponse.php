<?php

namespace Domain\API\Classes;

use Illuminate\Http\JsonResponse;

class ApiJsonResponse
{
	/**
	 * @var array<string, array<mixed>>|null $validation
	 */
	private ?array $validation = null;

	private ?string $error = null;

	private mixed $data = null;

	public function __construct(private int $status = 200)
	{
		//
	}

	/**
	 * @return self
	 */
	public static function make(int $status = 200)
	{
		return new self($status);
	}

	/**
	 * @param array<string, array<mixed>>|null $validation
	 * @return static
	 */
	public function setValidation(?array $validation)
	{
		$this->validation = $validation;

		return $this;
	}

	/**
	 * @param array<string, mixed>|null $data
	 * @return static
	 */
	public function setData(?array $data)
	{
		$this->data = $data;

		return $this;
	}

	/**
	 * @param string $error
	 * @return static
	 */
	public function setError(string $error)
	{
		$this->error = $error;

		return $this;
	}

	/**
	 * @return JsonResponse
	 */
	public function export()
	{
		$success = $this->status >= 200 && $this->status < 300;

		return response()->json(
			[
				"success" => $success,
				"validation" => (object) ($this->validation ?? []),
				"data" => (object) ($this->data ?? []),
				"error" => $this->error,
			],
			$this->status
		);
	}
}
