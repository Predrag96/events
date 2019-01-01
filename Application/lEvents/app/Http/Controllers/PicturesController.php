<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Picture;

class PicturesController extends Controller
{
    public function index()
    {
        $pics = Picture::all();
        return view('pages.pictures')->with('pics',$pics);
    }

    public function allp()
    {
        $pics = Picture::all();
        return $pics;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'path'=>'required'
        ]);
        $pic = new Picture();
        $pic->PicturePath= $request->input('path');
        $pic->save();
        return 'sacuvano' ;
    }

    public function addpic(Request $request)
    {
        $this->validate($request, [
            'path'=>'required'
        ]);
        $pic = new Picture();
        $pic->PicturePath= $request->input('path');
        $pic->save();
    }

}
