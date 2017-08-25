<?php
namespace Controllers;
class Db{
	private $link = null;
    protected function opnCon(){
        $this->link = mysqli_connect('localhost', 'root', '') or die('Failed');
        $d = mysqli_select_db($this->link, 'fpv') or die("failed");
        if(!$d) die("Error");
    }
	public function __construct()
   {
      $this->opnCon();
   }
   public function execute($sql){
       if($this->link==null) $this->opnCon();
       $r =  mysqli_query($this->link,$sql);
       if($r==false)
        die("Error in SQL: ".$sql);
      return $r;
   }

   public function rowCount($sql){
       $res = $this->execute($sql);
       return mysqli_num_rows($res);
   }

   public function fetch($sql){
    $res = $this->execute($sql);
      return mysqli_fetch_assoc($res);
   }

   public function fetchAll($sql){
    $res = $this->execute($sql);
    return mysqli_fetch_all($res,MYSQL_ASSOC);
   }
}
