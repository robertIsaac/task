<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Task extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('row_id');
            $table->unsignedTinyInteger('input_id');
            $table->unsignedMediumInteger('option_id')->nullable();
            $table->string('value')->nullable();

            $table->foreign('input_id')->references('id')->on('inputs')->onDelete('cascade');
            $table->foreign('option_id')->references('id')->on('options');
            $table->foreign('row_id')->references('id')->on('rows')->onDelete('cascade');
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
                $table->dropForeign('tasks_row_id_foreign');
                $table->dropForeign('tasks_input_id_foreign');
                $table->dropForeign('tasks_option_id_foreign');
            });
        }
        Schema::dropIfExists('tasks');
    }
}
