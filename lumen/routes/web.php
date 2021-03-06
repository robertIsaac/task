<?php
use Illuminate\Support\Facades\Config;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//$router->get('/', function () use ($router) {
//    return $router->app->version();
//});
$router->group(
    ['prefix' => 'api'],
    function () use ($router) {
        $router->post(
            'auth/login',
            [
                'uses' => 'AuthController@authenticate'
            ]
        );
        $router->group(
            [
                'middleware' => 'jwt.auth',
            ],
            function() use ($router) {
                $router->post('addInput', [
                    'middleware' => 'input',
                    'uses' => 'Input@addInput'
                ]);
                $router->post('addTask', [
                    'middleware' => 'task',
                    'uses' => 'Task@addTask'
                ]);
                $router->post('editTask', [
                    'middleware' => 'task',
                    'uses' => 'Task@editTask'
                ]);
                $router->post('deleteTask', [
                    'middleware' => 'task',
                    'uses' => 'Task@deleteTask'
                ]);
                $router->get('getInputs', [
                    'uses' => 'Input@getInputs'
                ]);
                $router->get('getTasks', [
                    'uses' => 'Task@getTasks'
                ]);
                $router->get('getUsers', [
                    'uses' => 'User@getUsers'
                ]);
                $router->post('addUser', [
                    'middleware' => 'user',
                    'uses' => 'User@addUser'
                ]);
                $router->post('editUser', [
                    'uses' => 'User@editUser'
                ]);
            }
        );
});


//Route::options(
//    '/{any:.*}',
//    [
//        function (){
//            return response(['status' => 'success']);
//        }
//    ]
//);
$router->get('', [
        function () {
            return redirect('ng');
        }]
);

$router->get('types', [
        function () {
//    var_dump(TYPES);
//    var_dump(Config('constants'));
            return TYPES;
        }]
);

$router->get('ng/{all:.*}', [
//    'where' => ['params', '(.*)'],
    function () {
        $ng = dirname(__DIR__) . '/public/ng/index.html';
        include_once $ng;
}]
);

$router->options('{all:.*}', [
    function() {
        return response('');
    }
]);