<?php
namespace Models;
class DB{
    private $link = null;
   public function __construct()
   {
       $this->link = mysqli_connect('localhost', 'root', '');
       mysqli_select_db($this->link, 'fpv');
      // $res = mysqli_query($db, "select * from user where auth_key='$k'");
   }
   public function execute($sql){
       return mysqli_query($this->link,$sql);
   }
   public function rowCount($sql){
       $res = $this->execute($sql);
       return mysqli_num_rows($res);
   }
}
?>