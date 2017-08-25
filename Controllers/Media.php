<?php
namespace Controllers;
class Media extends BaseController{
	public function __construct() {
		 parent::_construct();
	}

	public function Index(){
		$arr = [];
        $user_id = $this->user['id'];
        $parent_id = isset($_GET['folder_id']) ? $_GET['folder_id'] : 0;
		$rows = $this->fetchAll("select * from media where user_id=$user_id and parent_id=$parent_id");

        $index = 0;
		foreach ($rows as $m) {
        $arr[$index]['id'] = $m['id'];
        $arr[$index]['file_name'] = $m['file_name'];
        $arr[$index]['file_type'] = $m['file_type'];
        $arr[$index]['is_dir'] = $m['is_dir'];
        $arr[$index]['group_id'] = $m['group_id'];
        $arr[$index]['src'] =  "http://{$this->server_url}/uploaded/".$m['file_name'];
        //$s3->commands()->getPresignedUrl($m->file_name,'+2 days')->execute();
        $arr[$index]['is_dir'] = $m['is_dir'];
        $arr[$index]['parent_id'] = $m['parent_id'];
        $arr[$index]['thumb'] =  "{$this->server_url}/uploaded/thumbs/".$m['file_name'];
        if($m['is_dir']==1){
            $arr[$index]['icon_path'] = "http://{$this->server_url}/images/folder.png";
            $arr[$index]['title'] = $m['file_name'];
        }else if(trim($m['file_type'])=='video'){
            $arr[$index]['icon_path'] = "http://{$this['server_url']}/images/video.png";
            $arr[$index]['title'] = $m['actual_file_name'];
        }else{
            $arr[$index]['icon_path'] = "http://{$this->server_url}/uploaded/thumbs/".$m['file_name'];
            $arr[$index]['title'] = "";
        }
        $index++;
    }

    return json_encode($arr);
	}

    public function delete(){
        print_r($_REQUEST); exit;
            $sql = "delete from media where id=".$_POST['media_id'];

            $row = $this->fetch("select * from media where id=236");
            if($row){
                if(file_exists('uploads/'.$row['file_name'])){
                    unlink('uploads/'.$row['file_name']);
                }
            }

    }

    public function upload(){
        $folder_id = isset($_POST['folder_id']) ? $_POST['folder_id'] : 0;

        $path = $_FILES['file']['name'];
        $ext = pathinfo($path, PATHINFO_EXTENSION);



        $file_name = '1'.'-'.date('Ymd-hsi',time())."-uploaded.".$ext;


        $target_path = "uploaded/$file_name";


        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {

            $user_id = $this->user['id'];
            $group_id = 'ff';
            $file_name =$file_name;
            $parent_id = $folder_id;
            $actual_file_name = $_FILES['file']['name'];
            $file_type = in_array(strtolower($ext), array('jpg','png','gif','jpeg')) ? 'photo' : 'video';


            $sql = "insert  into `media`(`user_id`,`file_name`,`created_at`,`updated_at`,`file_type`,`group_id`,`is_dir`,`parent_id`,`actual_file_name`)
values ($user_id,'$file_name',NULL,NULL,'image','fgroup1',0,$folder_id,NULL)";

            if($this->execute($sql)){
                if($file_type=='photo'){
                    copy($target_path,'uploaded/thumbs/'.$file_name);
                    $this->resize_image('uploaded/thumbs/'.$file_name,200,200,true);
                }
        
                return json_encode(['status'=>'OK','id'=>'']);
            }

            echo json_encode(['status'=>'error','message'=>'Failed']);
        }else{
            die('Failed to upload');
        }


        echo json_encode(['status'=>'error','message'=>'Unknown Error']);

    }

    function resize_image($file, $w, $h, $crop=FALSE) {
        list($width, $height) = getimagesize($file);
        $r = $width / $height;
        if ($crop) {
            if ($width > $height) {
                $width = ceil($width-($width*abs($r-$w/$h)));
            } else {
                $height = ceil($height-($height*abs($r-$w/$h)));
            }
            $newwidth = $w;
            $newheight = $h;
        } else {
            if ($w/$h > $r) {
                $newwidth = $h*$r;
                $newheight = $h;
            } else {
                $newheight = $w/$r;
                $newwidth = $w;
            }
        }
        $src = imagecreatefromjpeg($file);
        $dst = imagecreatetruecolor($newwidth, $newheight);
        $r=imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
        imagejpeg($dst,$file);
        return $dst;
    }

    public function createFolder(){
        $postdata = file_get_contents("php://input");
        if (isset($postdata)) {
            $request = json_decode($postdata);

            $parent_id = isset($request->parent_id) ? $request->parent_id : 0;
            $user_id = $this->user['id'];
            $folder_name = $request->folder_name;

            $sql = "insert  into `media`(`user_id`,`file_name`,`created_at`,`updated_at`,`file_type`,`group_id`,`is_dir`,`parent_id`,`actual_file_name`)
values ($user_id,'$folder_name',NULL,NULL,'image','fgroup1',1,$parent_id,NULL)";
            $this->execute($sql);
        }
        return json_encode($request);
    }
}