<?php

namespace Controllers;

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
        foreach ($articles as $key) {
            $infoUser = $manager->getUserById($key['user_id']);
            $allUsernames[$key['user_id']] = $infoUser['username'];
            $allNbrCommentary[$key['user_id']] = $key['nbr_commentary'];
        }

        if (!empty($_SESSION['user_id'])) {
            $user = $manager->getUserById($_SESSION['user_id']);
            echo $this->renderView('home.html.twig',
                ['user' => $user, 'isConnected' => $user['id'], 'articles' => $articles, 'allUsernames' => $allUsernames, 'allNbrCommentary' => $allNbrCommentary]);
        } else {
            echo $this->renderView('home.html.twig', ['articles' => $articles, 'allUsernames' => $allUsernames, 'allNbrCommentary' => $allNbrCommentary]);
        }
    }

    public function profileAction()
    {
        if (isset($_GET['username'])) {
            $error = '';
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $manager = UserManager::getInstance();
                if ($manager->userCheckArticles($_POST)) {
                    $manager->insertArticles($_POST);
                    //$this->redirect('profile');

                } else {
                    $error = 'invalid data';
                }
            }
            $manager = UserManager::getInstance();
            $user = $manager->getUserByUsername($_GET['username']);
            $allCommentary = $manager->getCommentaryByGetUserId($user['id'])  ;
            $allArticles = $manager->getArticlesByGetUserId($user['id'])  ;

            $listCommentary = array();
            $listArticles = array();
            $listDateArticles = array();
            $listDateCommentary = array();
            $articlesDescription = array();
            $articlesTitle = array();
            $articlesContent = array();
            foreach($allArticles as $key) {
                $articlesContent[$key['id']] = $key['content'];
                $articlesDescription[$key['id']] = $key['description'];
                $articlesTitle[$key['id']] = $key['title'];
                $listDateArticles[$key['id']] = $key['update_date'];

            }
            foreach($allCommentary as $key) {
                $listCommentary[$key['id']] = $key['content'];
                $listDateCommentary[$key['id']] = $key['update_date'];

            }


            if ($user == false) {
                $this->redirect('home');
            } else {

                if (isset($_SESSION['user_id'])) {

                    $isConnected = $user;
                    if ($_SESSION['user_id'] == $user['id']) {

                        echo $this->renderView('profile.html.twig', ['error' => $error,
                            'user' => $user, 'isConnected' => $isConnected, 'allArticles'=> $allArticles,'allCommentary'=> $allCommentary,'listCommentary' => $listCommentary,'listDateCommentary' => $listDateCommentary,'listArticles'=>$listArticles,'listDateArticles'=>$listDateArticles,'articlesTitle'=> $articlesTitle,'articlesDescription'=>$articlesDescription,'articlesContent'=> $articlesContent]);
                    } else {
                        $visitor = $manager->getUserById($_SESSION['user_id']);
                        echo $this->renderView('profile.html.twig', ['error' => $error,
                            'user' => $user, 'isConnected' => $isConnected, 'visitor' => $visitor,  'allArticles'=> $allArticles,'allCommentary'=> $allCommentary,'listCommentary' => $listCommentary,'listDateCommentary' => $listDateCommentary,'listArticles'=>$listArticles,'listDateArticles'=>$listDateArticles,'articlesTitle'=> $articlesTitle,'articlesDescription'=>$articlesDescription,'articlesContent'=> $articlesContent]);
                    }
                } else {
                    echo $this->renderView('profile.html.twig', ['error' => $error,
                        'user' => $user]);
                }
            }
        } else {
            $this->redirect('home');
        }
    }

    public function articlesAction()
    {
        if (isset($_GET['id'])) {

        $error = '';
            $manager = UserManager::getInstance();
            $article = $manager->getArticlesById($_GET['id']);
            $infoUser = $manager->getUserById($article['user_id']);
            $userInfo = array();
            $key = '';
            $allNbrCommentary = array();
            $allUserCommentary = array();
            $allFaction = array();
            $allUsernames = array();
            $commentary = $manager->getCommentaryByArticleId($article['id']);
            foreach ($commentary as $key) {

                $infoUserCommentary = $manager->getUserById($key['user_id']);
                $allUsernames[$key['user_id']] = $infoUserCommentary['username'];
                $allUserCommentary[$key['user_id']] = $infoUserCommentary['nbr_commentary'];
                $allFaction[$key['user_id']] = $infoUserCommentary['faction'];
            }
            if ($article) {
                $userInfo['username'] = $infoUser['username'];
                $userInfo['faction'] = $infoUser['faction'];
                $userInfo['nbr_commentary'] = $infoUser['nbr_commentary'];
                $userInfo['nbr_articles'] = $infoUser['nbr_articles'];
                $allNbrCommentary = $article['nbr_commentary'];
            }


            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                if (isset($_POST['idDeleteCommentary'])) {
                    $manager->commentaryDelete($_POST, $article);
                }
                if (isset($_POST['content'])) {
                    $manager->insertCommentary($_POST, $article);
                }
                if (isset($_POST['contentEditing'])) {
                   if($manager->userCheckArticleEdition($_POST)){
                       $manager->articleEdition($_POST, $article);
                   }

                }

                if (isset($_POST['commentaryEditing'])) {
                    $manager->commentaryEdition($_POST);
                }

                    $manager->articlesDelete($article);

            }

            if (isset($_SESSION['user_id'])) {
                $user = $manager->getUserById($_SESSION['user_id']);
                echo $this->renderView('articles.html.twig', ['article' => $article, 'commentary' => $commentary, 'isConnected' => $user, 'userInfo' => $userInfo, 'allUserCommentary' => $allUserCommentary, 'allFaction' => $allFaction, 'allUsernames' => $allUsernames]);
            } else {
                echo $this->renderView('articles.html.twig', ['article' => $article, 'commentary' => $commentary, 'userInfo' => $userInfo, 'allUserCommentary' => $allUserCommentary, 'allFaction' => $allFaction, 'allUsernames' => $allUsernames]);
            }
        } else {
            $this->redirect('home');
        }
    }
}
