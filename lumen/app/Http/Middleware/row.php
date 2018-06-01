<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 25-May-18
 * Time: 1:39 PM
 */

namespace App\Http\Middleware;


class row
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            return response('Unauthorized.', 401);
        }
        foreach ($request AS $r) {
            var_dump($r);
        }
        return $next($request);
    }
}