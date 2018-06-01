<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 25-May-18
 * Time: 1:48 PM
 */

namespace App\Http\Middleware;
use Closure;
use Validator;

class User
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',
            'email' => 'required|unique:users',
            'permission' => 'required|numeric|max:255',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response('400 Bad Request', 400);
        }
        // validation will be made soon
        return $next($request);
    }

}