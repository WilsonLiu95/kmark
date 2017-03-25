<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        factory(\App\Model\User::class,20)->create();
        factory(\App\Model\Upload::class,60)->create();
        factory(\App\Model\Book::class,80)->create();
        factory(\App\Model\Mark::class,1000)->create();
        Model::reguard();
    }
}
