<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUploadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('upload', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('date')->comment('日期,格式为 2017/2/23。
            用于标识用户当天是否进行过上传操作');
            $table->integer('upload_time')->comment('用户今天进行了几次上传操作');
            $table->string('path')->comment('对应的存储路径,这里保持相对路径');
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
        Schema::drop('upload');
    }
}
