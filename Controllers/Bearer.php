<?php
namespace Controllers;
class Bearer extends Db{
	private function getAuthorizationHeader()
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            //print_r($requestHeaders);
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    /**
     * get access token from header
     * */
    function getBearerToken()
    {
        $headers = $this->getAuthorizationHeader();
        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    public static function init(){
        $auth = new self();
        $auth_key = $auth->getBearerToken();

        if (!$auth->checkKey($auth_key)) {
            header("HTTP/1.1 401 Unauthorized");
            echo json_encode(['status' => 'ERROR', 'message' => 'Not authorized']);
            exit;
        }
        $sql = "select * from user where auth_key='$auth_key'";
        $row = $auth->fetch($sql);
        return $row;
    }
    public function checkKey($k){
        return $this->rowCount("select * from user where BINARY auth_key='$k'") > 0;
    }
}