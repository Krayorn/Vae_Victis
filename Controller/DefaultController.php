<?php

namespace Controller;

use Model\UserManager;

class DefaultController extends BaseController
{
    public function homeAction()
    {
        $manager = UserManager::getInstance();
        $articles = $manager->allArticles();
        $key = array();
        $allUsernames = array();
        $allNbrCommentary = array();
        foreach($articles as $key ){

            $infoUser = $manager->getUserById($key['user_id']);
            $allUsernames[$key['user_id']] = $infoUser['username'];
            $allNbrCommentary[$key['user_id']] = $key['nbr_commentary'];

        }

        if (!empty($_SESSION['user_id']))
        {
            $user = $manager->getUserById($_SESSION['user_id']);
            echo $this->renderView('home.html.twig',
                ['user' => $user, 'isConnected' => $user['id'],'articles'=> $articles,'allUsernames'=>$allUsernames,'allNbrCommentary'=>$allNbrCommentary]);
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
            $infoUser = $manager->getUserById($article['user_id']);
            $userInfo = array();
            $key = '';
            $allNbrCommentary = array();
            $allUserCommentary = array();
            $allFaction = array();
            $allUsernames = array();
            $commentary = $manager->getCommentaryByArticleId($article['id']);
            foreach($commentary as $key ){

                $infoUserCommentary = $manager->getUserById($key['user_id']);
                $allUsernames[$key['user_id']] = $infoUserCommentary['username'];
                $allUserCommentary[$key['user_id']] = $infoUserCommentary['nbr_commentary'];
                $allFaction[$key['user_id']] = $infoUserCommentary['faction'];
            }

            if($article){

                $userInfo['username'] = $infoUser['username'];
                $userInfo['faction'] = $infoUser['faction'];
                $userInfo['nbr_commentary'] = $infoUser['nbr_commentary'];
                $userInfo['nbr_articles'] = $infoUser['nbr_articles'];


                $allNbrCommentary = $article['nbr_commentary'];
            }

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $manager->insertCommentary($_POST, $article);
            }




            if(isset($_SESSION['user_id'])){
            $user = $manager->getUserById($_SESSION['user_id']);
            echo $this->renderView('articles.html.twig', ['article' =>$article,'commentary'=>$commentary, 'isConnected' => $user,'userInfo'=>$userInfo,'allUserCommentary'=>$allUserCommentary,'allFaction'=> $allFaction,'allUsernames'=>$allUsernames]);
        }
        else{
                echo $this->renderView('articles.html.twig', ['article' =>$article,'commentary'=>$commentary,'allNbrCommentary'=>$allNbrCommentary]);
            }
        }
        else{
            $this->redirect('home');
        }
    }
}
