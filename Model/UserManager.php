<?php

namespace Model;

class UserManager
{
    private $DBManager;
    
    private static $instance = null;
    public static function getInstance()
    {
        if (self::$instance === null)
            self::$instance = new UserManager();
        return self::$instance;
    }
    
    private function __construct()
    {
        $this->DBManager = DBManager::getInstance();
    }

    public function getUserById($id)
    {
        $id = (int)$id;
        $data = $this->DBManager->findOne("SELECT * FROM users WHERE id = ".$id);
        return $data;
    }

    
    public function getUserByUsername($username)
    {
        $data = $this->DBManager->findOneSecure("SELECT * FROM users WHERE username = :username",
        ['username' => $username]);
        return $data;
    }
    public function getArticlesByTitle($title)
    {
        $data = $this->DBManager->findOneSecure("SELECT * FROM articles WHERE title = :title",
            ['title' => $title]);
        return $data;
    }
    public function getUserByEmail($email)
    {
        $data = $this->DBManager->findOneSecure("SELECT * FROM users WHERE email = :email",
        ['email' => $email]);
        return $data;
    }
        public function getCommentaryByArticleId($article_id)
        {
            $data = $this->DBManager->findAllSecure("SELECT * FROM commentary WHERE article_id = :article_id",
                ['article_id' => $article_id]);
            return $data;
        }

    public function userCheckRegister($data)
    {
        $valid = true;
        $errors = array();
        
        if (empty($data['username']) || empty($data['email']) || empty($data['password']) || empty($data['confirm_password'])){
            $valid = false;
            $errors['username'] = 'Missing fields';
        }

        if(strlen($data['username']) < 4){
            $valid = false;
            $errors['username'] = 'Username too short';
        }
        
        $testUsername = $this->getUserByUsername($data['username']);
        if ($testUsername !== false){
            $valid = false;
            $errors['username'] = 'Username already used';
        }

        $testEmail = $this->getUserByEmail($data['email']);
        if ($testEmail !== false){
            $valid = false;
            $errors['email'] = 'Email already used';
        }

        if($data['password'] !== $data['confirm_password']){
            $valid = false;
            $errors['confirm'] = 'Password does not match';
        }

        if($valid == false){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }
        else{
            return true;
        }
    }
    
    private function userHash($pass)
    {
        $hash = password_hash($pass, PASSWORD_BCRYPT);
        return $hash;
    }

    public function giveDate()
    {
        $date = date("Y-m-d");
        $hours = date("H:i");
        return $date." ".$hours;
    }

    public function userRegister($data)
    {
        $user['role'] =     '1';
        $user['username'] = $data['username'];
        $user['email'] = $data['email'];
        $user['password'] = $this->userHash($data['password']);
        $user['faction']=$data['faction'];
        $user['firstname']='';
        $user['lastname']='';
        $user['nbr_commentary']='0';
        $user['nbr_articles']='0';
        $this->DBManager->insert('users', $user);
        $write = $this->write_log('access.log', ' => function : userRegister || User ' . $user['username'] . ' just register.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function userCheckLogin($data)
    {
        $valid = true;
        $errors = array();
       if (empty($data['username']) OR empty($data['password'])){
            $valid = false;
            $errors['field'] = 'Fields missing';
        }
        $user = $this->getUserByUsername($data['username']);
        if (!$user){
            $valid = false;
            $errors['username'] = 'User not found ';
        }
            
        if (password_verify($data['password'], $user['password']) == false)
        {
            $valid = false;
            $errors['password'] = 'Password does not match with username';

        }

        if($valid == false){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function userLogin($username)
    {
        $data = $this->getUserByUsername($username);
        if ($data === false)
            return false;
        $_SESSION['user_id'] = $data['id'];
        $_SESSION['username'] = $data['username'];
        echo json_encode(array('success'=>true));
        $write = $this->write_log('access.log', ' => function : userLogin || User ' . $_SESSION['username'] . ' just connected.' . "\n");
        exit(0);
    }

    public function userCheckArticles($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['title']) OR empty($data['description']) OR empty($data['content'])){
            $valid = false;
            $errors['article'] = 'Missing fields';
        }
      /* $testTitle = $this->getArticlesByTitle($data['title']);
        if ($testTitle){
            $valid = false;
            $errors['title'] = 'Title already used';
        }*/
        if(!$valid){
            json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function insertArticles($data)
    {

        $user['user_id'] = $_SESSION['user_id'];
        $user['date'] = $this ->giveDate();
        $user['title'] = $data['title'];
        $user['description'] = $data['description'];
        $user['content'] = $data['content'];
        $user['nbr_commentary'] =  '0';
        $user['update_date'] = $this->giveDate();
        $this->DBManager->insert('articles', $user);
        $write = $this->write_log('access.log', ' => function : insertArticles || User ' . $_SESSION['username'] . ' just created a new Article named ' . $user['title'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function insertCommentary($data,$article)
    {
        $user['user_id'] = $_SESSION['user_id'];
        $user['date'] = $this ->giveDate();
        $user['article_id'] = $article['id'];
        $user['content'] = $data['contentCommentary'];
        $user['update_date'] = $this->giveDate();
        $this->DBManager->insert('commentary', $user);
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function myArticles()
    {
        $id_user = $_SESSION['user_id'];

        $data = $this->DBManager->findAllSecure("SELECT * FROM articles WHERE user_id = :id_user",
            ['id_user' => $id_user]);
        return $data;
    }
     public function firstnameEdition($data)
    {
        $update['firstnameEditing'] = $data['firstnameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `firstname`= :firstnameEditing WHERE `id` = :user_id", $update);
        $write = $this->write_log('access.log', ' => function : firstnameEdition || User ' . $_SESSION['username'] . ' just updated his name to ' . $update['firstnameEditing'] . '.' . "\n");        
        echo json_encode(array('success'=>true));
        exit(0);        
    }

    public function lastnameEdition($data)
    {
        $update['lastnameEditing'] = $data['lastnameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `lastname`= :lastnameEditing WHERE `id` = :user_id", $update);
        $write = $this->write_log('access.log', ' => function : lastnameEdition || User ' . $_SESSION['username'] . ' just updated his lastname to ' . $update['lastnameEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);      
    }

    public function usernameEdition($data)
    {
        $update['usernameEditing'] = $data['usernameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `username`= :usernameEditing WHERE `id` = :user_id", $update);
        $write = $this->write_log('access.log', ' => function : usernameEdition || User ' . $_SESSION['username'] . ' just updated his username to ' . $update['usernameEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function factionEdition($data)
    {
        $update['factionEditing'] = $data['factionEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `faction`= :factionEditing WHERE `id` = :user_id", $update);
        $write = $this->write_log('access.log', ' => function : factionEdition || User ' . $_SESSION['username'] . ' just updated his faction to ' . $update['factionEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);  
    }

    public function emailEdition($data)
    {
        $update['emailEditing'] = $data['emailEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `email`= :emailEditing WHERE `id` = :user_id", $update);
        $write = $this->write_log('access.log', ' => function : emailEdition || User ' . $_SESSION['username'] . ' just updated his email to ' . $update['emailEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function userCheckFirstname($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['firstnameEditing'])){
            $valid = false;
            $errors['fields'] = 'Fields missing';
        }
        if($valid === false){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }
        else{
            return true;
        }

    }

    public function userCheckLastname($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['lastnameEditing'])){
            $valid = false;
            $errors['fields'] = 'Fields missing';
        }
        if($valid === false){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }
        else{
            return true;
        }

    }

    public function userCheckUsername($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['usernameEditing'])){
            $valid = false;
            $errors['fields'] = 'Fields missing';
        }
        if(!$valid){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function userCheckEmail($data){
        $valid = true;
        $errors = array();
        if (empty($data['emailEditing'])){
            $valid = false;
            $errors['fields'] = 'Fields missing';
        }
        if(!$valid){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }        
    }


    public function write_log($file, $text){
        $date = $this->giveDate();
        $file_log = fopen('logs/' . $file, 'a');
        $log_info = $date . $text;
        fwrite($file_log, $log_info);
        fclose($file_log); 
        return true;
    }
}
