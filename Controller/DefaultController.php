<?php

namespace Controller;

use Model\UserManager;

class DefaultController extends BaseController
{
    public function homeAction()
    {

        $error = '';
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $manager = UserManager::getInstance();
        echo 'slt';
            if ($manager->userCheckArticles($_POST)) {
                echo 'yo';
                $manager->insertArticles($_POST);
                $this->redirect('home');
            } else {
                $error = "Invalid data";
            }
        }

        if (!empty($_SESSION['user_id']))
        {
            $manager = UserManager::getInstance();
            $user = $manager->getUserById($_SESSION['user_id']);

            echo $this->renderView('home.html.twig',
                ['name' => $user['username']]);
        }
        else
            $this->redirect('login');
    }

}
