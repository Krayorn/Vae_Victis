<?php

namespace Controller;

use Model\UserManager;

class DefaultController extends BaseController
{
    public function homeAction()
    {
        $manager = UserManager::getInstance();
        $articles = $manager->allArticles();
        if (!empty($_SESSION['user_id']))
        {
            $user = $manager->getUserById($_SESSION['user_id']);
            echo $this->renderView('home.html.twig',
                ['user' => $user, 'isConnected' => $user['id'],'articles'=> $articles]);
        }
        else{
            echo $this->renderView('home.html.twig', ['articles'=> $articles]);
        }
    }
    public function articlesAction(){
        if(isset($_GET['title'])) {
            $error = '';
            $manager = UserManager::getInstance();
            $article = $manager->getArticlesByTitle($_GET['title']);
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $manager->insertCommentary($_POST, $article);
            }
            $commentary = $manager->getCommentaryByArticleId($article['id']);
            if(isset($_SESSION['user_id'])){
                $user = $manager->getUserById($_SESSION['user_id']);
                echo $this->renderView('articles.html.twig', ['article' =>$article,'commentary'=>$commentary, 'isConnected' => $user]);
            }
            else{
                echo $this->renderView('articles.html.twig', ['article' =>$article,'commentary'=>$commentary]);
            }
        }
        else{
            $this->redirect('home');
        }
    }
}
