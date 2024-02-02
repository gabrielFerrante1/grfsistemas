<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansPricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('plans_prices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plan');
            $table->foreign('id_plan')->references('id')->on('plans')->onDelete('CASCADE');
            $table->unsignedBigInteger('id_system');
            $table->foreign('id_system')->references('id')->on('systems')->onDelete('CASCADE');
            $table->float('price');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('plans_prices');
    }
}
