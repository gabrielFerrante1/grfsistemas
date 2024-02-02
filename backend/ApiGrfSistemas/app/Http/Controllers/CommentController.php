<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\CommentDisLikes;
use App\Models\CommentLikes;
use App\Models\System;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getCommentsOneSystem($id, Request $request)
    {
        $data = ['error' => '', 'newComment' => false, 'editComment' => ['stars' => 0, 'body' => '']];

        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', Comment::where('id_system', $id)->count());

        $comments = Comment::with('user')
        ->select('id', 'stars', 'body', 'date', 'id_user')
        ->where('id_system', $id)
        ->offset($offset)
        ->limit($limit)
        ->orderBy('id', 'DESC')
        ->get();

        $data['comments'] = $comments;
        $data['countComments'] = Comment::where('id_system', $id)->count();

        if(Auth::check()) {
            $checkComment = Comment::where('id_system', $id)->where('id_user', Auth::id())->first();

            if($checkComment) {
                $data['editComment'] = [
                    'stars' => $checkComment->stars,
                    'body' => $checkComment->body
                ];
            } else {
                $data['newComment'] = true;
            }
        }

        foreach ($comments as $k => $v) {
            $data['comments'][$k]->likedUser = false;
            $data['comments'][$k]->dislikedUser = false;

           if(Auth::check()) {
                $checkLiked = CommentLikes::where('id_comment', $v->id)
                ->where('id_user', Auth::id())
                ->count();

                if($checkLiked > 0) $data['comments'][$k]->likedUser = true;

                $checkDisliked = CommentDisLikes::where('id_comment', $v->id)
                ->where('id_user', Auth::id())
                ->count();

                if($checkDisliked > 0) $data['comments'][$k]->dislikedUser = true;
           }

           $countLikes = CommentLikes::where('id_comment', $v->id)->count();
           $data['comments'][$k]->countLikes = $countLikes;

           $countDisLikes = CommentDisLikes::where('id_comment', $v->id)->count();
           $data['comments'][$k]->countDisLikes = $countDisLikes;

           $data['comments'][$k]->date = $this->transformDate($v->date);

           unset($v->id_user);
           unset($v->user->id);
        }
        
        return $data;
    }


    public function changeValueLikeAndDislike ($id_comment, Request $request) {
        $data = ['error' => ''];

        $comment = Comment::find($id_comment);
        $type = $request->input('type');

        if($comment && $type) {
            if($type == 'like') { 
                $liked = CommentLikes::where('id_comment', $id_comment)->where('id_user', Auth::id())->count();

                if($liked > 0) {
                    CommentLikes::where('id_comment', $id_comment)->where('id_user', Auth::id())->delete();
                } else {
                    CommentDisLikes::where('id_comment', $id_comment)->where('id_user', Auth::id())->delete();

                    $save = new CommentLikes();
                    $save->id_comment = $id_comment;
                    $save->id_user = Auth::id();
                    $save->save();
                }
            } else if($type == 'dislike') {
                $disLiked = CommentDisLikes::where('id_comment', $id_comment)->where('id_user', Auth::id())->count();

                if($disLiked > 0) {
                    CommentDisLikes::where('id_comment', $id_comment)->where('id_user', Auth::id())->delete();
                } else {
                    CommentLikes::where('id_comment', $id_comment)->where('id_user', Auth::id())->delete();

                    $save = new CommentDisLikes();
                    $save->id_comment = $id_comment;
                    $save->id_user = Auth::id();
                    $save->save();
                }
            }
        } else {
            $data['error'] = 404;
        }

        return $data;
    } 

    public function newOrEditComment($id, Request  $request)
    {
        $data =  ['error' => ''];

        $checkSystem = System::where('id', $id)->count();
        if($checkSystem < 1) {
            $data['error'] = 'Este sistema não existe';
            return $data;
        }

        $stars = $request->input('stars');
        $body = $request->input('body', NULL);

        if(!$stars || $stars > 5 ) {
            $data['error'] = 'Parametros enviados, não seguem as regras';
            return $data;
        }

        if($body && $body == '') $body = NULL; 

        $checkComment = Comment::where('id_system', $id)->where('id_user', Auth::id())->count();
        
        if($checkComment > 0) {
            Comment::where('id_system', $id)->where('id_user', Auth::id())->update([
                'stars' => $stars,
                'body' => $body
            ]);
        } else {
            $save = new Comment();
            $save->id_system = $id;
            $save->id_user = Auth::id();
            $save->stars = $stars;
            $save->body = $body;

            $save->save();
        }
        
        return $data;
    }


    protected function transformDate($date)
    {
        //Date
        date_default_timezone_set('America/Sao_Paulo');

        $date  = new DateTime($date);
        $date2 = new DateTime(date('Y-m-d H:i:s'));
        $re = $date->diff($date2);

        $date = ['date' => ''];
        
        if($re->h < 1 && $re->d < 1 && $re->m < 1 && $re->y === 0) {
                if($re->i < 1) {
                    $date['date'] = $re->s;
                    $date['date_type'] = 'SECONDS';
                } else {
                    if($re->i === 1) {
                        $date['date']  = $re->i;

                        $date['date_type'] = 'MINUTE';
                    } else {
                        $date['date'] = $re->i;
    
                        $date['date_type'] = 'MINUTES';
                    }
                }
            } else if($re->h >= 1 && $re->d < 1 && $re->m < 1  && $re->y === 0) {
                if($re->h === 1) { 
                        $date['date'] = $re->h;
    
                        $date['date_type'] = 'HOUR';
                } else {
                        $date['date'] = $re->h;
        
                        $date['date_type'] = 'HOURS';
                }
            } else if($re->d >= 1 && $re->m < 1  && $re->y === 0) {
                if($re->d === 1) {
                    $date['date'] = $re->d;
    
                    $date['date_type'] = 'DAY';
                } else {
                    $date['date'] = $re->d;
    
                    $date['date_type'] = 'DAYS';
                }
            } else if($re->m < 1  && $re->y === 0) {
                if($re->d === 1) {
                    $date['date'] = $re->d;
    
                    $date['date_type'] = 'DAY';
                } else {
                    $date['date'] = $re->d;
    
                    $date['date_type'] = 'DAYS';
                }
            }  else if($re->m > 1  && $re->y === 0) {
                if($re->m === 1) {
                    $date['date'] = $re->m;
    
                    $date['date_type'] = 'MONTH';
                } else {
                    $date['date'] = $re->m;
    
                    $date['date_type'] = 'MONTHS';
                }
            } else if($re->y >= 1) {
                if($re->y === 1) {
                    $date['date'] = $re->y;
    
                    $date['date_type'] = 'YEAR';
                } else {
                    $date['date'] = $re->y;
    
                    $date['date_type'] = 'YEARS';
                }
        }

        return $date;
    } 
     
}
