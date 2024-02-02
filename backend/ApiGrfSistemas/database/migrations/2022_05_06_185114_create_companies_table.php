<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlCompany')->create('companies', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->text('avatar');
            $table->string('name', 100);
            $table->string('description', 300)->nullable(true);
            $table->tinyInteger('status')->default(0);
            $table->tinyInteger('verified')->default(0);
            $table->dateTime('date_create')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlCompany')->dropIfExists('companies');
    }
}
