<?php

namespace App\Exceptions;

use Exception;
use Auth;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;


class Handler extends ExceptionHandler {

    use \App\Traits\Rest;
    use \App\Traits\RestExceptionHandler;

    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    public function report(Exception $e) {
        if ($this->shouldntReport($e)) {
            return;
        }
        if (Auth::Check()) {
            $user = Auth::user();
        } else if(\App\Traits\Rest::getAuthorizedUser()) {
            $user = \App\Traits\Rest::getAuthorizedUser();
        }
        $user_data = [];
        if (isset($user)) {
            $user_data = ['id' => $user->id, 'username' => $user->first_name . ' ' . $user->last_name, 'email' => $user->email];
        }
        \Log::error($e, [
            'person' => $user_data]);
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e) {
        if (!$this->isApiCall($request)) {
            $retval = parent::render($request, $e);
        } else {
            $retval = $this->getJsonResponseForException($request, $e);
        }

        return $retval;
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception) {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect()->guest(route('login'));
    }

}
