<?php

namespace App\Traits;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

trait RestExceptionHandler {

    /**
     * Creates a new JSON response based on exception type.
     *
     * @param Request $request
     * @param Exception $e
     * @return \Illuminate\Http\JsonResponse
     */
    protected function getJsonResponseForException(Request $request, Exception $e) {
        switch (true) {
            case $this->isModelNotFoundException($e):
                $retval = $this->modelNotFound();
                break;
            default:
                $retval = $this->badRequest($e->getMessage(),$e->getCode());
        }

        return $retval;
    }

    /**
     * Returns json response for generic bad request.
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function badRequest($message, $code=null,$statusCode = 400) {
        if($code){ 
            $message =  \App\Components\Message::getMessageFromCode($code).": ".$message;
        }

        return $this->jsonResponse([
            'message' => $message],
             $statusCode, $code);
    
    }

    /**
     * Returns json response for Eloquent model not found exception.
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function modelNotFound($code, $message = 'Record not found', $statusCode = 404) {
        return $this->jsonResponse(['message' => $message], $statusCode, $code);
    }

    /**
     * Returns json response.
     *
     * @param array|null $payload
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function jsonResponse(array $payload = null, $statusCode = 404, $code = 0) {
        $payload = $payload ?: [];
        $payload['success'] = false;
        $payload['error_code'] = $code;
        return response()->json($payload, $statusCode);
    }

    /**
     * Determines if the given exception is an Eloquent model not found.
     *
     * @param Exception $e
     * @return bool
     */
    protected function isModelNotFoundException(Exception $e) {
        return $e instanceof ModelNotFoundException;
    }

}
