<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesPurchases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlCompany')->create('companies_purchases', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_purchase');
            $table->unsignedBigInteger('id_companie');
            $table->foreign('id_companie')->references('id')->on('companies')->onDelete('CASCADE');
            $table->dateTime('date')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlCompany')->dropIfExists('companies_purchases');
    }
}
