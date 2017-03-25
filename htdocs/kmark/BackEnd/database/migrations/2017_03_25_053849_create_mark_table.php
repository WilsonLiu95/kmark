<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMarkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mark', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('book_id');
            $table->integer('user_id');
            $table->integer('upload_id');
            $table->integer('time')->comment('是用户当天第几次上传操作产生');
            $table->string('start_position')->comment('标记开始的位置');
            $table->string('length')->comment('标记的长度');
            $table->string('mark_time')->comment('标记产生的时间');
            $table->string('content')->comment('标记的内容');

            $table->softDeletes();
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
        Schema::drop('mark');
    }
}
