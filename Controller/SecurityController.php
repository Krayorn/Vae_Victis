<?php

namespace Controller;

use Model\UserManager;

class SecurityController extends BaseController
{
    public function loginAction()
    {
        if (isset($_SESSION['user_id'])) {
            $this->redirect('home');
        } else {
            $error = '';
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $manager = UserManager::getInstance();
                if ($manager->userCheckLogin($_POST)) {
                    $manager->userLogin($_POST['username']);
                    $this->redirect('home');
                    echo 'yo';
                }
            }
            else {
                $error = "Invalid username or password";
            }
            echo $this->renderView('login.html.twig', ['error' => $error]);
        }

    }

    public function logoutAction()
    {
        session_destroy();
        $this->redirect('login');
    }

    public function registerAction()
    {
        if (isset($_SESSION['user_id'])) {
            $this->redirect('home');
        } else {
            $error = '';
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $manager = UserManager::getInstance();
                if ($manager->userCheckRegister($_POST)) {
                    $manager->userRegister($_POST);
                    $this->redirect('home');
                } else {
                    $error = "Invalid data";
                }
            }
            echo $this->renderView('register.html.twig', ['error' => $error]);
        }
    }

    public function profileAction()
    {

        $error = '';
        $manager = UserManager::getInstance();


        $user = $manager->getUserById($_SESSION['user_id']);

        echo $this->renderView('profile.html.twig', ['error' => $error,
            'username' => $user['username'],
            'email' => $user['email'],
            'faction' => $user['faction'], 'firstname' => $user['firstname'], 'lastname' => $user['lastname'],
            'nbr_commentary' => $user['nbr_commentary'], 'nbr_articles' => $user['nbr_articles']]);
    }


    public function profileEditingAction()
    {
        $error = '';
        $manager = UserManager::getInstance();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if(isset($_POST['infoFirstname'])){
            $manager->firstnameEdition($_POST);
                $this->redirect('profileEditing');
        }
            if(isset($_POST['infoUsername'])){
                $manager->usernameEdition($_POST);
                $this->redirect('profileEditing');
            }
            if(isset($_POST['infoLastname'])){
                $manager->lastnameEdition($_POST);
                $this->redirect('profileEditing');
            }
            if(isset($_POST['infoFaction'])){
                $manager->factionEdition($_POST);
                $this->redirect('profileEditing');
            }
            if(isset($_POST['infoEmail'])){
                $manager->emailEdition($_POST);
                $this->redirect('profileEditing');
            }
    }

        $user = $manager->getUserById($_SESSION['user_id']);
        echo $this->renderView('profileEditing.html.twig', ['error' => $error,
            'username' => $user['username'],
            'email' => $user['email'],
            'faction' => $user['faction'], 'firstname' => $user['firstname'], 'lastname' => $user['lastname'],
            'nbr_commentary' => $user['nbr_commentary'], 'nbr_articles' => $user['nbr_articles']]);
    }

}