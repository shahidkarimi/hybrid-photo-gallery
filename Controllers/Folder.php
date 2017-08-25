<?php
namespace Controllers;

class Folder extends BaseController{
	
	public function __construct() {
		 parent::_construct();
	}

	public function listing(){
		$parent_id = isset($_GET['parent_id']) ? $_GET['parent_id']: 0;

		if($_GET['back']=='1'){ 
			$item = $this->fetch("select * from media where id=".$parent_id);
			$parent_id = $item['parent_id'];

				$sql = "SELECT (SELECT COUNT(*) FROM media WHERE is_dir=1 AND parent_id=c.id)AS no_f,id,parent_id,file_name FROM media c WHERE is_dir=1 and parent_id=$parent_id";
		}else{

		$sql = "SELECT (SELECT COUNT(*) FROM media WHERE is_dir=1 AND parent_id=c.id)AS no_f,id,parent_id,file_name FROM media c WHERE is_dir=1 and parent_id=$parent_id";
		}

		$rows = $this->fetchAll($sql);

		return json_encode($rows);
	}

	public function back(){
		$parent_id = isset($_GET['parent_id']) ? $_GET['parent_id']: 0;

		$p = $this->fetch("SELECT * FROM media c WHERE is_dir=1 and id=$parent_id limit 1");

		$new_parent = $p['parent_id'];

		$sql = "SELECT (SELECT COUNT(*) FROM media WHERE is_dir=1 AND parent_id=c.id)AS no_f,id,parent_id,file_name FROM media c WHERE is_dir=1 and parent_id=$new_parent";

		$rows = $this->fetchAll($sql);

		return json_encode($rows);
	}

}