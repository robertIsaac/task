<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 25-May-18
 * Time: 10:45 AM
 */

namespace App\Http\Controllers;
use App;
use Illuminate\Http\Request;

class Task extends Controller
{
    function getTasks(Request $request) {
        if ($request->auth->permission < 16) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
        return App\Row::with([
            'user',
            'tasks',
            'tasks.option',
            'tasks.input'
            ])
            ->orderBy('rows.id', 'ASC')
            ->get();
    }

    function addTask(Request $request) {
        if ($request->auth->permission < 32) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
//        $lastRowId = App\Task::max('row_id');
        $row = new APP\Row();
        $row->user_id = $request->auth->id;
        $row->save();
        $rowId = $row->id;
        foreach ($request->all() as $inputId => $value) {
            $task = new App\Task();
            $task->row_id = $rowId;
            $input = App\Input::find($inputId);
            $task->input_id = $inputId;
            if (TYPES[$input->type] == 'select') {
                $task->option_id = $value;
                $task->value = null;
            } else {
                $task->value = $value;
                $task->option_id = null;
            }
            $task->save();
        }
        return ['id' => $rowId];
    }

    function editTask(Request $request) {
        $row = App\Row::find($request->id)->with('tasks', 'tasks.input')->get();
        foreach ($row[0]->tasks as $task) {
            if (TYPES[$task->input->type] == 'select') {
                $task->option_id = $request[$task->input->id];
            } else {
                $task->value = $request[$task->input->id];
            }
            $task->save();
        }
    }

    function deleteTask(Request $request) {
        APP\Row::destroy($request->rowId);
        return 'true';
    }
}