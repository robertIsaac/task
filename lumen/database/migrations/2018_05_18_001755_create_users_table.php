<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedTinyInteger('permission');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('option')) {
            Schema::table('options', function(Blueprint $table)
            {
                $table->dropForeign('options_user_id_foreign');
            });
        }
        if (Schema::hasTable('inputs')) {
            Schema::table('inputs', function (Blueprint $table) {
                $table->dropForeign('inputs_user_id_foreign');
            });
        }
        if (Schema::hasTable('rows')) {
            Schema::table('rows', function (Blueprint $table) {
                $table->dropForeign('rows_user_id_foreign');
            });
        }
        Schema::dropIfExists('users');
    }
}
