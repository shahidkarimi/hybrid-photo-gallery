<?php
namespace Controllers;

class BaseController extends Db{
    private $link = null;
    public $server_url = 'localhost/authApp';
    public $user = null;
   public $protected = false;
   
   public function _construct(){
      $this->user =  Bearer::init();
   }
   
}