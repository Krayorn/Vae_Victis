<?php

namespace Controllers;

use Model\UserManager;

class SecurityController extends BaseController
{
    public function loginAction()
    {
        if (isset($_SESSION['user_id'])) {
            $this->redirect('home');
        }else {
            $error = '';
           if ($_SERVER['REQUEST_METHOD'] === 'POST'){
                $manager = UserManager::getInstance();
                if ($manager->userCheckLogin($_POST)) {
                    $manager->userLogin($_POST['username']);
                }
                else {
                    $error = "Invalid username or password";
                }
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
                } else {
                    $error = "Invalid data";
                }
            }
            echo $this->renderView('register.html.twig', ['error' => $error]);
        }
    }

    public function profileEditingAction()
    {
        $error = '';
        $manager = UserManager::getInstance();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if(isset($_POST['firstnameEditing'])){
                if( $manager->userCheckFirstname($_POST)){
                    $manager->firstnameEdition($_POST);
                }
            }
            if(isset($_POST['usernameEditing'])) {
                if ($manager->userCheckUsername($_POST)) {
                    $manager->usernameEdition($_POST);
                }
            }
            if(isset($_POST['lastnameEditing'])){
                if( $manager->userCheckLastname($_POST)){
                    $manager->lastnameEdition($_POST);
                }
            }
            if(isset($_POST['factionEditing'])){
                $manager->factionEdition($_POST);
            }
            if(isset($_POST['emailEditing'])){
                if ($manager->userCheckEmail($_POST)) {
                    $manager->emailEdition($_POST);
                }
            }
        }

        $user = $manager->getUserById($_SESSION['user_id']);
        echo $this->renderView('profileEditing.html.twig', ['error' => $error,
            'user' => $user]);
    }

}