<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSystemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('systems', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('id_companie');
            $table->string('name', 81);
            $table->text('description')->nullable(); 
            $table->unsignedBigInteger('id_category');
            $table->foreign('id_category')->references('id')->on('systems_categories')->onDelete('CASCADE');
            $table->string('link');
            $table->tinyInteger('new')->default(1);
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
        Schema::connection('mysqlMain')->dropIfExists('systems');
    }
}
