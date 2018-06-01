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

class Input
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
            'name' => 'required|unique:inputs|max:255',
            'type' => 'required|numeric|max:255',
            'value' => 'max:255',
            'required' => '',
            'order' => 'numeric|max:255'
        ]);
        $type = intval($request->type);
        $order = intval($request->order);
        if ($validator->fails() || $type > 255 || $type < 0 || $order > 255 || $order < 1 ) {
            return response('400 Bad Request', 400);
        }
        if (TYPES[$request->type] == 'select' && !$request->has('options.*.name') && count($request->input('options')) < 2) {
            return response('400 Bad Request, type select must have at least two options', 400);
        }

        return $next($request);
    }

}