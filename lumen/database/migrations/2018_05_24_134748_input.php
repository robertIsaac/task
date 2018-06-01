<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Input extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inputs', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name');
            $table->tinyInteger('type');
            $table->string('value');
            $table->boolean('required');
            $table->unsignedTinyInteger('order');
            $table->unsignedInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('tasks')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->dropForeign('tasks_input_id_foreign');
            });
        }
        if (Schema::hasTable('options')) {
            Schema::table('options', function (Blueprint $table) {
                $table->dropForeign('options_input_id_foreign');
            });
        }
        if (Schema::hasTable('inputs')) {
            Schema::table('inputs', function (Blueprint $table) {
                $table->dropForeign('inputs_user_id_foreign');
            });
        }
        Schema::dropIfExists('inputs');
    }
}
