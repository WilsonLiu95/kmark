<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Model\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
    ];
});

$factory->define(App\Model\Book::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->title,
        'author' => $faker->name,
    ];
});
$factory->define(App\Model\Upload::class, function (Faker\Generator $faker) {
    return [
        'user_id' => $faker->numberBetween(1,20),
        'path' => $faker->url,
        'upload_time'=> $faker->numberBetween(1,3),
        'date' => $faker->date(),
    ];
});
$factory->define(App\Model\BookUser::class, function (Faker\Generator $faker) {
    return [
        'user_id'=>1,
        'book_id'=>3
    ];
});
$factory->define(App\Model\Mark::class, function (Faker\Generator $faker) {
    $mock_text = $faker->text(200);
    return [
        'user_id' => $faker->numberBetween(1,20),
        'upload_id'=>$faker->numberBetween(1,60),
        'book_id'=>$faker->numberBetween(1,80),
        'upload_time' => $faker->numberBetween(1,3),
        'length' => strlen($mock_text),
        'content' => $mock_text,
        'start_position' => $faker->numberBetween(1,1000) * 100,
        'mark_time'=>$faker->dateTime,

    ];
});
