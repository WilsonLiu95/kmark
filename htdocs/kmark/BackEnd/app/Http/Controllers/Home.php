<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class Home extends Controller
{
    public function postUpload(){
        if(request()->hasFile('mycliping')){
            if(request()->file('mycliping')->isValid()){
                request()->file('mycliping')->move(storage_path('app') . '/kmark', session()->getId().'.txt');
                return $this->json(['isSuccess'=>true]);
            }else{
                return $this->errorMsg('文件无效');
            }
        }else{
            return $this->errorMsg('请选择正确的文件类型');
        }

    }
    public function getTest(){
        return '生效';
    }
}
