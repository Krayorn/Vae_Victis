<?php

namespace Controller;

use Model\UserManager;

class DefaultController extends BaseController
{
    public function homeAction()
    {
        $name = '';
        $error = '';
        if ($_SERVER['REQUEST_METHOD'] === 'POST')
        {
            $manager = UserManager::getInstance();

            if($manager->userCheckArticles($_POST)){
                $manager->insertArticles($_POST);
                $this->redirect('home');
            }
            else {
                $error = "Invalid data";
            }
        }
        if(!empty($_SESSION['user_id'])){
            $manager = UserManager::getInstance();
            $user = $manager->getUserById($_SESSION['user_id']);
            $name = $user['username'];
        }
          echo $this->renderView('home.html.twig',
                                   ['error' => $error, 'user' => $name]);
    
        }

}
