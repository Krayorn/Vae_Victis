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
    
    public function userCheckRegister($data)
    {
        if (empty($data['username']) OR empty($data['email']) OR empty($data['password']) OR empty($data['faction']))
            return false;
        $data = $this->getUserByUsername($data['username']);
        if ($data !== false)
            return false;
        // TODO : Check valid email
        return true;
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
        if (empty($data['username']) OR empty($data['password']))
            return false;
        $user = $this->getUserByUsername($data['username']);
        if ($user === false)
            return false;
        $hash = $this->userHash($data['password']);
        if ($hash !== $user['password'])
        {
            return false;
        }
        return true;
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
