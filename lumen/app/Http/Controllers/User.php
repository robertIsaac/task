<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 31-May-18
 * Time: 11:53 AM
 */

namespace App\Http\Controllers;
use App;
use Illuminate\Http\Request;

class User
{
    function getUsers(Request $request) {
        if ($request->auth->permission < 64) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
        return APP\User::all();
    }

    function addUser(Request $request) {
        if ($request->auth->permission < 64) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
        $user = new App\User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->permission = $request->permission;
        $user->password = app('hash')->make($request->password);
        $user->save();
        return ['id' => $user->id];
    }

    function editUser(Request $request) {
        if ($request->auth->permission < 64) {
            return response()->json([
                'error' => 'forbidden.'
            ], 403);
        }
        $user = App\User::find($request->id);
        $user->permission = $request->permission;
        if ($request->password != '') {
            $user->password = app('hash')->make($request->password);
        }
        $user->save();
        return 'true';
    }
}