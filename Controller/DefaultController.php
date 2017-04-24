<?php

namespace Controller;

use Model\UserManager;

class DefaultController extends BaseController
{
    public function homeAction()
    {



        if (!empty($_SESSION['user_id']))
        {
            $manager = UserManager::getInstance();
            $user = $manager->getUserById($_SESSION['user_id']);
            $articles = $manager->myArticles();
            echo $this->renderView('home.html.twig',
                ['user' => $user, 'isConnected' => $user['id'],'articles'=> $articles]);
        }
        else{
            echo $this->renderView('home.html.twig');
        }
    }
    public function articlesAction(){

        if(isset($_GET['id'])) {
            $error = '';
            echo $this->renderView('articles.html.twig', []);
        }
    }

}
