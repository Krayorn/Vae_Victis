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

        if(strlen($data['username']) < 6){
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
        $hash = password_hash($pass, PASSWORD_BCRYPT, ['salt' => 'saltysaltysaltysalty!!']);
        return $hash;
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
    }



    
    public function userCheckLogin($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['username']) OR empty($data['password'])){
            $valid = false;
            $errors['username'] = 'Fields missing';
        }
        $user = $this->getUserByUsername($data['username']);
        if ($user === false){
            $valid = false;
            $errors['username'] = 'User not found ';
        }
        $hash = $this->userHash($data['password']);
        if ($hash !== $user['password'])
        {
            $valid = false;
            $errors['password'] = 'Password does not match with username';
        }

          if($valid == false){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }
        else{
            return true;
        }
    }
    
    public function userLogin($username)
    {
        $data = $this->getUserByUsername($username);
        if ($data === false)
            return false;
        $_SESSION['user_id'] = $data['id'];
        return true;
    }

    public function insertArticles($data)
    {

        $user['user_id'] = $_SESSION['user_id'];
        $user['date'] = '2003-08-04';
        $user['title'] = $data['title'];
        $user['description'] = $data['description'];
        $user['content'] = $data['content'];
        $user['nbr_commentary'] =  0;
        $user['update_date'] ='2003-08-04';
        $user['tags']= $data['tagFaction'];
        $this->DBManager->insert('articles', $user);
    }
    public function userCheckArticles($data)
    {
        if (empty($data['title']) OR empty($data['description']) OR empty($data['content']))
            return false;
        $user = $this->getUserByUsername($data['username']);
        if ($user === false)
            return false;

        return true;
    }


}
