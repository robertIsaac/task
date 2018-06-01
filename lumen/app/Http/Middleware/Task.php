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

class Task
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
        // validation will be made soon
        return $next($request);
    }

}