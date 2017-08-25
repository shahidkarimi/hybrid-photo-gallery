<?php
/**
 * Created by PhpStorm.
 * User: win8.1
 * Date: 3/31/2017
 * Time: 1:28 AM
 */

namespace Controllers;


class Auth extends BaseController
{


    public function login(){ 

        $postdata = file_get_contents("php://input");
       
        $post_arr = json_decode($postdata);

        $user_name = $post_arr->email;

        $password = $post_arr->password;

        $sql = "select * from user where username='$user_name' and password_hash='$password'";

        header('Content-Type: application/json');

        if($this->rowCount($sql) > 0){
        	$row= $this->fetch($sql);
        	return json_encode(['status'=>1,'access_token'=>$row['auth_key']]);
        }else{
        	return json_encode(['status'=>0,'message'=> 'Not found']);
        }

    }

}