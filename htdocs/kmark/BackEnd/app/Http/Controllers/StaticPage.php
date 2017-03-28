<?php

namespace App\Http\Controllers;


use App\Model\Book;
use App\Model\Mark;
use App\Model\Upload;
use App\Model\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class StaticPage extends Controller
{

    public function getIndex()
    {
        $data['user'] = $this->user();
        $data['mark'] = $this->mark();
        $data['book'] = $this->book();

        $data['chart']['user'] = $this->makeChart(5, User::class);
        $data['chart']['upload'] = $this->makeChart(5, Upload::class);
        $data['chart']['mark'] = $this->makeChart(5, Mark::class);

        return $this->json($data);
    }

    private function mark()
    { // 随机产生10条mark信息
        $marks = [];
        $length = Mark::count();

        if ($length > 10) {
            $max = 10;
        } else {
            $max = $length; // 防止总长度小于10的场景
        }
        while (count($marks) < $max) {
            $id = rand(1, $length);
            if (!array_has($marks, $id)) {
                $mark = Mark::find($id);
                $mark['title'] = $mark->book->title;
                $mark['author'] = $mark->book->author;
                $marks[$id] = $mark;
            }
        }


        return array_values($marks);
    }

    private function book()
    { // 热门推荐书籍
        $books = Book::orderBy('reader_number', 'desc')
            ->take(10)->get()->toArray(); // 获取排名最高的10本属书

        $books = array_map(function ($book) {
            $book['mark_number'] = Mark::where('book_id', $book['id'])->count();
            return $book;
        }, $books);


        return $books;
    }

    private function user()
    { // 用户统计数据
        if (session()->has('id')) {
            $user = User::find(session()->get('id'));
            $data['rank'] = $user->id;
            $data['upload'] = (int)$user->upload()->sum('upload_time'); // 统计总共上传多少次
            $data['book'] = $user->mark()->groupBy('book_id')->count(); // 统计上传了多少本书
            $data['mark'] = $user->mark()->count(); // 统计总共多少条标记
            $data['name'] = $user->name;
            return $data;
        }
        return null;
    }

    private function makeChart($max, $modelClass)
    { // 用户注册统计表
        $chart = [];
        for ($i = 0; $i < $max; $i++) {
            $start_time = Carbon::now()->subMonths($i + 1)->endOfMonth();
            $end_time = Carbon::now()->subMonths($i)->endOfMonth();
            if ($modelClass === Upload::class) {
                array_unshift($chart, [
                    'month' => Carbon::now()->subMonths($i)->format('Y/m'),
                    'number' => (int)app($modelClass)->where('created_at', '<', $end_time)
                        ->where('created_at', '>', $start_time)
                        ->sum('upload_time')
                ]);
            } else {
                array_unshift($chart, [
                    'month' => Carbon::now()->subMonths($i)->format('Y/m'),
                    'number' => app($modelClass)->where('created_at', '<', $end_time)
                        ->where('created_at', '>', $start_time)
                        ->count()
                ]);
            }

        }
        return $chart;
    }

}
