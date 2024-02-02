<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSystemsMediasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('systems_medias', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('id_system');
            $table->foreign('id_system')->references('id')->on('systems')->onDelete('CASCADE');
            $table->text('source');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('systems_medias');
    }
}
