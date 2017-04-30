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
    public function getAllUsers(){
        $data = $this->DBManager->findAllSecure("SELECT * FROM users ");
        return $data;
    }

    public function getArticlesById($article_id)
    {
        $data = $this->DBManager->findOneSecure("SELECT * FROM articles WHERE id = :article_id",
            ['article_id' => $article_id]);
        return $data;
    }

    public function getUserByEmail($email)
    {
        $data = $this->DBManager->findOneSecure("SELECT * FROM users WHERE email = :email",
            ['email' => $email]);
        return $data;
    }

    public function getEmailByUserId($user_id)
    {
        $data = $this->DBManager->findOneSecure("SELECT email FROM users WHERE id = :user_id",
            ['user_id' => $user_id]);
        return $data;
    }

    public function getCommentaryByArticleId($article_id)
    {
        $data = $this->DBManager->findAllSecure("SELECT * FROM commentary WHERE article_id = :article_id",
            ['article_id' => $article_id]);
        return $data;
    }

    public function getCommentaryByGetUserId($user_id)
    {
        $data = $this->DBManager->findAllSecure("SELECT * FROM commentary WHERE user_id = :user_id",
            ['user_id' => $user_id]);
        return $data;
    }

    public function getArticlesByGetUserId($user_id)
    {
        $data = $this->DBManager->findAllSecure("SELECT * FROM articles WHERE user_id = :user_id",
            ['user_id' => $user_id]);
        return $data;
    }

    public function getUserArticles()
    {
        $data = $this->DBManager->findAllSecure("SELECT * FROM articles");
        return $data;
    }
    public function getUserByArticleId($article_id)
    {

        $data = $this->DBManager->findOneSecure("SELECT * FROM users WHERE id = :article_id",
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
        $write = $this->writeLog('access.log', ' => function : userRegister || User ' . $user['username'] . ' just register.' . "\n");
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
        $write = $this->writeLog('access.log', ' => function : userLogin || User ' . $_SESSION['username'] . ' just connected.' . "\n");
        exit(0);
    }

    public function userCheckArticles($data, $img)
    {
        $valid = true;
        $errors = array();
        $extension= array();
        $extension = ['.jpeg','.png','.jpg','.PNG','.JPG','.JPEG'];


        $extFile = strrchr(basename($img['description']['name']), '.');
        if (empty($data['title']) OR empty($img['description']['name']) OR empty($data['articleContent'])){
            $valid = false;
            $errors['article'] = 'Missing fields';
        }
        if(!in_array($extFile,$extension)){
            $valid = false;
            $errors['file'] = 'Mauvais type';
        }
        $testTitle = $this->getArticlesByTitle($data['title']);
        if ($testTitle){
            $valid = false;
            $errors['title'] = 'Title already used';
        }
        if(!$valid){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function insertArticles($data, $img)
    {
        $filepath = "uploads/articles_img/" . $data['title'] . strrchr(basename($img['description']['name']), '.');
        $user['user_id'] = $_SESSION['user_id'];
        $user['date'] = $this ->giveDate();
        $user['title'] = $data['title'];
        $user['description'] = $filepath;
        $user['content'] = $data['articleContent'];
        $user['nbr_commentary'] =  '0';
        $user['update_date'] = $this->giveDate();
        $this->DBManager->insert('articles', $user);
        $write = $this->writeLog('access.log', ' => function : insertArticles || User ' . $_SESSION['username'] . ' just created a new Article named ' . $user['title'] . '.' . "\n");
        $req = $this->getArticlesByTitle($data['title']);
        $update['description'] = "uploads/articles_img/" . $req['id'] . strrchr(basename($img['description']['name']), '.');
        $update['id']=$req['id'];
        $query = $this->DBManager->findOneSecure("UPDATE articles SET `description`= :description  WHERE `id` = :id", $update);
        move_uploaded_file($img['description']['tmp_name'], $update['description']);
        $this->addArticleUser();
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function userCheckCommentary($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['content'])){
            $valid = false;
            $errors['field'] = 'Missing fields';
        }


        if(!$valid){
            json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }
    public function userCheckDeleteArticle()
    {
        $valid = true;
        $errors = array();
        if (empty($_SESSION['user_id'])){
            $valid = false;
            $errors['user'] = 'Vous devez être connecté';
        }


        if(!$valid){
            json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function insertCommentary($data,$article)
    {
        $user['user_id'] = $_SESSION['user_id'];
        $user['date'] = $this ->giveDate();
        $user['article_id'] = $article['id'];
        $user['content'] = $data['content'];
        $user['update_date'] = $this->giveDate();
        $this->DBManager->insert('commentary', $user);
        $this->addCommentaryUser();
        $this->addCommentaryArticle($article['id']);
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

    public function allArticles(){
        $data = $this->DBManager->findAllSecure("SELECT * FROM articles");
        return $data;
    }

    public function addCommentaryUser()
    {

        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `nbr_commentary`=  nbr_commentary + 1 WHERE `id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : addCommentary || User ' . $_SESSION['username'] . ' just added a commentary .' . "\n");
        return $query;
    }

    public function addArticleUser()
    {
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET   `nbr_articles `=  nbr_articles + 1 WHERE id = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : addCommentary || User ' . $_SESSION['username'] . ' just added a commentary .' . "\n");

        return $query;
    }

    public function addCommentaryArticle($article_id)
    {
        $update['article_id'] = $article_id;
        $query = $this->DBManager->findOneSecure("UPDATE articles SET nbr_commentary=  nbr_commentary + 1 WHERE id = :article_id", $update);
        return $query;
    }

    public function deleteCommentaryArticle($article_id)
    {
        $update['article_id'] = $article_id;
        $query = $this->DBManager->findOneSecure("UPDATE articles SET `nbr_commentary` =  nbr_commentary - 1 WHERE `id` = :article_id", $update);
        return $query;
    }
    public function deleteArticleUser($user_id)
    {
        $update['user_id'] = $user_id;
        $query = $this->DBManager->findOneSecure("UPDATE users SET `nbr_articles` =  nbr_articles - 1 WHERE `id` = :user_id", $update);
        return $query;
    }
    public function deleteCommentaryUser($user_id)
    {
        $query = $this->DBManager->findOneSecure("UPDATE users SET `nbr_commentary`=  nbr_commentary - 1 WHERE `id` = :user_id",['user_id'=>$user_id]);
        return $query;
    }

    public function userCheckArticleEdition($data)
    {
        $valid = true;
        $errors = array();
        if (empty($data['contentEditing'])  OR empty($data['titleEditing'])){
            $valid = false;
            $errors['fields'] = 'Fields missing';
        }
        if(strlen($data['contentEditing']) < 4){
            $valid = false;
            $errors['fields'] = 'Content trop court';
        }
        if($valid === false){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }
        else{
            return true;
        }
    }

    public function articleEdition($data,$article)
    {
        $update['titleEditing'] = $data['titleEditing'];
        $update['contentEditing'] = $data['contentEditing'];
        $update['article_id'] = $article['id'];
        $update['update_date'] = $this->giveDate();
        $query = $this->DBManager->findOneSecure("UPDATE articles SET `title`= :titleEditing, `content` = :contentEditing,update_date = :update_date WHERE  `id` = :article_id", $update);
        $write = $this->writeLog('access.log', ' => function : articleEdition || User ' . $_SESSION['username'] . ' just updated his article '.  $update['titleEditing'] . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }
    public function userCheckCommentaryEdition($data)
    {
        $valid = true;
        $errors = array();
        if( empty($data['commentaryEditing']) OR empty($data['id'])){
            $valid = false;
            $errors['field'] = 'Missing fields';
        }

        if(strlen($data['commentaryEditing']) < 2){
            $valid = false;
            $errors['length'] = 'Contenu trop court';
        }


        if(!$valid){
            json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function commentaryEdition($data)
    {
        $update['commentaryEditing'] = $data['commentaryEditing'];
        $update['id'] = $data['id'];
        $update['user_id'] = $_SESSION['user_id'];
        $update['update_date'] = $this->giveDate();
        $query = $this->DBManager->findOneSecure("UPDATE commentary SET `content` = :commentaryEditing,update_date = :update_date WHERE  `id` = :id AND `user_id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : articleEdition || User ' . $_SESSION['username'] . ' just updated his article '."\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function commentaryDelete($data,$article)
    {

        $update['id'] = $data['idCommentaryToDelete'];
        var_dump($update['id'] );
        $user_id = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("DELETE  FROM commentary WHERE  `id` = :id", $update);
        $write = $this->writeLog('access.log', ' => function : articleEdition || User ' . $_SESSION['username'] . ' just deleted his article '."\n");
        $this->deleteCommentaryArticle($article['id']);
        $this->deleteCommentaryUser($user_id);
        echo json_encode(array('success'=>true));
        exit(0);
    }
    public function articlesDelete($article_id)
    {

        $update['id'] = $article_id['id'];
        $filepath = $article_id['description'];
        $user_id = $_SESSION['user_id'];
        unlink($filepath);
        $query = $this->DBManager->findOneSecure("DELETE  FROM articles WHERE  `id` = :id", $update);
        $write = $this->writeLog('access.log', ' => function : articleEdition || User ' . $_SESSION['username'] . ' just updated his article '."\n");
        $this->commentaryDeleteArticleId($update['id']);
        $this->deleteArticleUser($user_id);



        echo json_encode(array('success'=>true));
        exit(0);
    }
    public function commentaryDeleteArticleId($data)
    {
        $update['id'] = $data;
        $query = $this->DBManager->findOneSecure("DELETE  FROM commentary WHERE  `article_id` = :id", $update);
        $write = $this->writeLog('access.log', ' => function : articleEdition || User ' . $_SESSION['username'] . ' just updated his article '."\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }


    public function firstnameEdition($data)
    {
        $update['firstnameEditing'] = $data['firstnameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `firstname`= :firstnameEditing WHERE `id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : firstnameEdition || User ' . $_SESSION['username'] . ' just updated his name to ' . $update['firstnameEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function lastnameEdition($data)
    {
        $update['lastnameEditing'] = $data['lastnameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `lastname`= :lastnameEditing WHERE `id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : lastnameEdition || User ' . $_SESSION['username'] . ' just updated his lastname to ' . $update['lastnameEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function usernameEdition($data)
    {
        $update['usernameEditing'] = $data['usernameEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `username`= :usernameEditing WHERE `id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : usernameEdition || User ' . $_SESSION['username'] . ' just updated his username to ' . $update['usernameEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function factionEdition($data)
    {
        $update['factionEditing'] = $data['factionEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `faction`= :factionEditing WHERE `id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : factionEdition || User ' . $_SESSION['username'] . ' just updated his faction to ' . $update['factionEditing'] . '.' . "\n");
        echo json_encode(array('success'=>true));
        exit(0);
    }

    public function emailEdition($data)
    {
        $update['emailEditing'] = $data['emailEditing'];
        $update['user_id'] = $_SESSION['user_id'];
        $query = $this->DBManager->findOneSecure("UPDATE users SET `email`= :emailEditing WHERE `id` = :user_id", $update);
        $write = $this->writeLog('access.log', ' => function : emailEdition || User ' . $_SESSION['username'] . ' just updated his email to ' . $update['emailEditing'] . '.' . "\n");
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
        if(strlen($data['firstnameEditing']) < 4){
            $valid = false;
            $errors['fields'] = 'Prénom trop court';
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
        if(strlen($data['lastnameEditing']) < 4){
            $valid = false;
            $errors['fields'] = 'Nom de famille trop court';
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
        if(strlen($data['usernameEditing']) < 4){
            $valid = false;
            $errors['fields'] = 'Pseudo trop court';
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
        $testEmail = $this->getEmailByUserId($data['emailEditing']);
        if (!$testEmail){
            $valid = false;
            $errors['email'] = 'Email déjà utilisé';
        }
        if(!$valid){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function userCheckFaction($data){
        $valid = true;
        $errors = array();
        if (empty($data['factionEditing'])){
            $valid = false;
            $errors['fields'] = 'Faction manquante';
        }
        if(!$valid){
            echo json_encode(array('success'=>false, 'errors'=>$errors));
            exit(0);
        }else{
            return true;
        }
    }

    public function writeLog($file, $text){
        $date = $this->giveDate();
        $file_log = fopen('logs/' . $file, 'a');
        $log_info = $date . $text;
        fwrite($file_log, $log_info);
        fclose($file_log);
        return true;
    }
}
