<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 25-May-18
 * Time: 1:43 PM
 */

namespace App\Http\Controllers;
use App;
use Illuminate\Http\Request;
use Auth;


class Input extends Controller
{
    function getInputs(Request $request) {
        if ($request->auth->permission < 16) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
        return App\Input::orderBy('order', 'ASC')->with(['user', 'options'])->get();
    }

    function addInput(Request $request) {
        if ($request->auth->permission < 48) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
        App\Input::where('order', '>=', $request->order)->increment('order');
        $input = new App\Input();
        $input->name = $request->name;
        $input->type = $request->type;
        $input->value = $request->value;
        $input->required = $request->required == 'true';
        $input->order = $request->order;
        $input->user_id = $request->auth->id;
        $input->save();
        $inputId = $input->id;
        $options = [];
        if (TYPES[$request->type] == 'select') {
            foreach ($request->input('options.*.name') as $value) {
                $option = new App\Option();
                $option->input_id = $inputId;
                $option->name = $value;
                $option->user_id = $request->auth->id;
                $option->save();
                $options[] = $option->id;
            }
        }
        return [
            'id' => $inputId,
            'optionsId' => $options
        ];
    }
}