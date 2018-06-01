<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Option extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('options', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->unsignedTinyInteger('input_id');
            $table->string('name');
            $table->unsignedInteger('user_id');
            $table->timestamps();

            $table->unique(['input_id', 'name']);
            $table->foreign('input_id')->references('id')->on('inputs')->onDelete('cascade');
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
        if (Schema::hasTable('options')) {
            Schema::table('options', function (Blueprint $table) {
                $table->dropForeign('options_input_id_foreign');
                $table->dropForeign('options_user_id_foreign');
            });
        }

        if (Schema::hasTable('tasks')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->dropForeign('tasks_option_id_foreign');
            });
        }
        Schema::dropIfExists('options');
    }
}
