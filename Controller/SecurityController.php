<?php

namespace Controller;

use Model\UserManager;

class SecurityController extends BaseController
{
    public function loginAction()
    {
        if(isset($_SESSION['user_id'])){
            $this->redirect('home');
        }
        else{
            $error = '';
            echo 'yo';
            if ($_SERVER['REQUEST_METHOD'] === 'POST')
            {
                echo 'slt';
                $manager = UserManager::getInstance();
                if ($manager->userCheckLogin($_POST))
                {
                    echo 'yo';
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
        echo $this->redirect('login');
    }

    public function registerAction()
    {
        if(isset($_SESSION['user_id'])){
            $this->redirect('home');
        }
        else{
            $error = '';
            if ($_SERVER['REQUEST_METHOD'] === 'POST')
            {
                $manager = UserManager::getInstance();
                if ($manager->userCheckRegister($_POST))
                {
                    $manager->userRegister($_POST);
                    $this->redirect('home');
                }
                else {
                    $error = "Invalid data";
                }    
            }
            echo $this->renderView('register.html.twig', ['error' => $error]);
        }
    }

    public function profilAction()
    {
        echo $this->renderView('profil.html.twig');
    }
}