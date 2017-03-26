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
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Webpatser\Uuid\Uuid;

class Home extends Controller
{
    public function postUpload(){
        $id = session()->get('id');
        $user = User::find($id);

        if(request()->hasFile('mycliping')){
            if(request()->file('mycliping')->isValid()){
                $now = Carbon::now();
                $dir_path = storage_path('app') . '/kmark/' . $now->year . '/' .$now->month . '/' . $now->day . '/';
                $upload = $user->upload ()->where('date', $now->toDateString())->first();
                if($upload){ // 今天上传过,则直接次数+1
                    $file_name = $user->name .'_' . ($upload->upload_time+1) . '.txt';
                    $upload->update([
                        'upload_time'=>$upload->upload_time+1,
                        'path'=> $dir_path . $file_name
                    ]);
                    session()->put('upload_id', $upload->id); // 更新session中 upload_id
                    session()->put('upload_time', $upload->upload_time); // 更新session中的次数
                } else {
                    $file_name = $user->name .'_1' . '.txt';
                    $upload = Upload::create([ // 生成新的上传记录
                        'user_id'=>$id,
                        'date'=>$now->toDateString(),
                        'upload_time'=>1,
                        'path'=> $dir_path . $file_name,
                    ]);
                    session()->put('upload_time', 1); // 更新session中的次数
                    session()->put('upload_id', $upload->id); // 更新session中 upload_id
                }
                request()->file('mycliping')->move($dir_path, $file_name);
                return $this->json(['isSuccess'=>true]);
            }else{
                return $this->errorMsg('文件无效');
            }
        }else{
            return $this->errorMsg('请选择正确的文件类型');
        }

    }
    public function postUploadNote(){
        $this->validate(request(),[
            'notes'=>'required|array',
            'book'=>'required|array'
        ]);
        $books = request()->book;
        $user_id = session()->get('id');
        $upload_id = session()->get('upload_id');
        $upload_time = session()->get('upload_time');
        $book_map = []; // 书籍title与book_id关系的映射表
        foreach($books as $book){ // 遍历创建书籍
            $db_book = Book::where('title', $book['title'])
                ->where('author', $book['author'])->first();
            if(!$db_book){
               $db_book = Book::create([ // 更新书籍
                    'title'=>$book['title'],
                    'author'=>$book['author'],
                    'user_id'=>session()->get('id')
                ]);
            }
            $book_map[$book['title']] = $db_book->id;
        }
        $notes = request()->notes;
        foreach ($notes as $note) { // 遍历创建mark
            $mark = Mark::firstOrCreate([ // 如果没有就创建
                'start_position'=>$note['start_position'],
                'content'=>$note['content'],
                'length'=>$note['length'],
                'mark_time'=>$note['mark_time'],
                'book_id'=>$book_map[$note['title']],
                'user_id'=> $user_id,
                'upload_id'=>$upload_id,
            ]);
        }
        Mark::where('user_id', $user_id)->where('upload_time',0)->update([ // 统一更新upload_time
            'upload_time'=>$upload_time
        ]);
    }
    public function getIsLogin(){
        // session中需含有user的id,而cookie中需要含有uuid

        $user_id = session()->get('id');
        $uuid = Cookie::get('uuid');

        if(!session()->has('id') && !Cookie::has('uuid')){ // 两者都没有说明没有注册过
            return $this->json(['isLogin' => false]);
        }

        // 登录过,去查询用户的姓名
        if(session()->has('id')){ // session中含有user的id表示登录注册过
            $user = User::find($user_id);
            $handle = $this->json([ // 待返回的值
                'isLogin' => true,
                'name' => $user->name]);
            if(!Cookie::has('uuid')){ // 用户侧相应的uuid cookie被清除了,则再进行种植
                $cookie = Cookie::make('uuid', $user->uuid, 60 * 24 * 365); // uuid设置为365天的cookie
                return $handle->withCookie($cookie);
            }else{
                return $handle;
            }
        }else if(Cookie::has('uuid')){ // 但是有uuid,说明注册过,但是session过期了
                $user = User::where('uuid', $uuid)->first();
                Session::put('id', $user->id);
                return $this->json([ // 待返回的值
                    'isLogin' => true,
                    'name' => $user->name]);
        }
    }
    public function postLogin(){
        $this->validate(request(),[
            'name'=>'required',
            'email'=>'required|email',
            'isNewUser'=>'required',
        ]);
        $isExists = User::where('email',request()->email) // 邮箱标识唯一用户
            ->exists();
        if($isExists){
            if(request()->isNewUser === 'true'){ // 点击了注册的用户
                $result = ['msg'=>'您已注册过,请勿重复注册。已帮您登录'];
            }else{
                $result = ['msg'=>'登录成功,祝您使用愉快'];
            }
            $id = User::where('email',request()->email)->value('id');
            $uuid = User::where('email',request()->email)->value('uuid');
            session()->put('id', $id);
            $uuid_cookie = Cookie::make('uuid', $uuid, 60*24*30);
            return $this->json($result)->withCookie($uuid_cookie);

        }
        // 不存在该用户
        if(request()->isNewUser === 'true'){ // 新用户
            $uuid = Uuid::generate(); // 生成uuid

            $user = User::create([ // 制造用户
                'name'=>request()->name,
                'email'=>request()->email,
                'uuid'=> $uuid
            ]);
            session()->put('id', $user->id);
            $cookie = Cookie::make('uuid',$uuid, 60*24*30); // uuid保持一个月的cookie
            return $this->json(['msg'=>'注册成功'])->withCookie($cookie);
        }else{ // 数据库中不存在该用户,用户还标识自己为老用户,视为错误
            return $this->errorMsg('没有该用户,请校验');
        }
    }
    public function getTest(){
        $now = Carbon::now();
        echo $now->toDateString();
    }
}
