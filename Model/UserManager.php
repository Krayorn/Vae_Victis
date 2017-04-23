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
    public function getUserByEmail($email)
    {
        $data = $this->DBManager->findOneSecure("SELECT * FROM users WHERE email = :email",
        ['email' => $email]);
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
        echo json_encode(array('success'=>true));
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
        $user['tags']= $data['tagFaction'];
        $this->DBManager->insert('articles', $user);
    }
     public function firstnameEdition($data)
    {
        $update['firstnameEditing'] = $data['firstnameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `firstname`= :firstnameEditing WHERE `id` = :user_id", $update);
        return $query;
    }
    public function lastnameEdition($data)
    {
        $update['lastnameEditing'] = $data['lastnameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `lastname`= :lastnameEditing WHERE `id` = :user_id", $update);
        return $query;
    }
    public function usernameEdition($data)
    {
        $update['usernameEditing'] = $data['usernameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `username`= :usernameEditing WHERE `id` = :user_id", $update);
        return $query;
    }
    public function factionEdition($data)
    {
        $update['factionEditing'] = $data['factionEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `faction`= :factionEditing WHERE `id` = :user_id", $update);
        return $query;
    }
    public function emailEdition($data)
    {
        $update['emailEditing'] = $data['emailEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `email`= :emailEditing WHERE `id` = :user_id", $update);
        return $query;
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
        }else{
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

}
