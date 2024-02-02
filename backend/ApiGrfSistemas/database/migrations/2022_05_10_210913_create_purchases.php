<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('purchases', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->float('total_amount', 14, 2);
            $table->tinyInteger('mail_send')->default(0);
            $table->tinyInteger('payment_status')->default(0);
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
        Schema::connection('mysqlMain')->dropIfExists('purchases');
    }
}
