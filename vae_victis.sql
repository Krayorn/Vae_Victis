-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Dim 30 Avril 2017 à 21:06
-- Version du serveur :  5.7.14
-- Version de PHP :  7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `vae_victis`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `nbr_commentary` int(255) NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `articles`
--

INSERT INTO `articles` (`id`, `user_id`, `date`, `title`, `description`, `content`, `nbr_commentary`, `update_date`) VALUES
(69, 38, '2017-04-30 20:20:00', 'Vikings !', 'uploads/articles_img/69.jpg', '<p>Il y a plusieurs si&egrave;cles, les Vikings disparurent, d&eacute;laissant leurs terres ancestrales sur le d&eacute;clin en qu&ecirc;te de rivages inexplor&eacute;s.</p><p>Ceux qui avaient pr&eacute;f&eacute;r&eacute; rester furent conquis et assimil&eacute;s par les Chevaliers.</p><p>Apr&egrave;s avoir fond&eacute; un foyer par-del&agrave; les mers, les Vikings revinrent en masse il y a quelques si&egrave;cles. De nombreuses raisons les poussaient &agrave; agir ainsi, mais ils voulaient surtout reprendre leur terre ancestrale du Nord&nbsp;: Valkenheim. Des centaines de clans vikings coexistent d&eacute;sormais dans la toundra gel&eacute;e, dans une paix relative que l&#39;observateur non averti prendra pour une guerre civile perp&eacute;tuelle.</p><p>Les Vikings sont les ma&icirc;tres incontest&eacute;s de la mer et des fleuves. Impressionnant spectacle que de voir les invincibles armadas de drakkars form&eacute;es par cette frustre nation, qui devient alors quasiment invincible.</p>', 4, '2017-04-30 20:20:00'),
(70, 41, '2017-04-30 20:29:00', 'Samurai', 'uploads/articles_img/70.jpg', '<p>L&#39;Histoire n&#39;a pas &eacute;t&eacute; tendre envers les Samoura&iuml;s.</p><p>Issus d&#39;une contr&eacute;e lointaine de l&#39;autre c&ocirc;t&eacute; de l&#39;oc&eacute;an, leur empereur et leur patrie ont &eacute;t&eacute; sacrifi&eacute;s au feu et &agrave; l&#39;eau. Pr&egrave;s d&#39;un mill&eacute;naire plus tard, cette nation nomade &agrave; cesser d&#39;errer pour fonder un nouvel empire pr&egrave;s des terres ancestrales des Vikings et de celles, contest&eacute;es, des Chevaliers.</p><p>Apr&egrave;s quelques d&eacute;cennies pass&eacute;es &agrave; s&#39;acclimater aux collines mar&eacute;cageuses qu&#39;on appelle le Bourbier, ils prosp&egrave;rent mais restent malgr&eacute; tout en inf&eacute;riorit&eacute; num&eacute;rique criante par rapport &agrave; leurs voisins. Ils devront s&#39;appuyer sur leur sup&eacute;riorit&eacute; martiale, leur ruse et leur d&eacute;votion &agrave; leur culture pour survivre... car ils sont sans doute les derniers de leur lign&eacute;e.</p>', 4, '2017-04-30 20:29:00'),
(71, 40, '2017-04-30 20:30:00', 'Chevaliers ', 'uploads/articles_img/71.jpg', '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>Les Chevaliers</p><p>&quot;Courage&nbsp;! Frappez, braves chevaliers&nbsp;! L&#39;homme meurt, mais la gloire vit&nbsp;!&nbsp;<br />Frappez&nbsp;! La mort vaut mieux que la d&eacute;faite&nbsp;!&quot;</p><p>&mdash; Sir Walter Scott</p><p>&nbsp;</p><p>Les imp&eacute;tueux Chevaliers d&#39;Ashfeld font r&eacute;gner la justice par la force.</p><p>Envoy&eacute;s par la L&eacute;gion de Fer pour imposer la paix, ils ont go&ucirc;t&eacute; &agrave; la libert&eacute; et &eacute;lu domicile &agrave; Ashfeld. Ils estiment que la plupart, voire la totalit&eacute; des ruines antiques recouvrant leurs terres sont l&#39;&oelig;uvre du Grand Empire, pr&eacute;curseur de la L&eacute;gion de Fer.</p><p>Les Chevaliers d&#39;Ashfeld ont connu l&#39;anarchie pendant des si&egrave;cles&nbsp;: il s&#39;agissait alors d&#39;un ramassis de seigneurs guerriers &eacute;gocentriques et autres chevaliers mercenaires en maraude. Ces dix derni&egrave;res ann&eacute;es, ils ont &eacute;t&eacute; regroup&eacute;s sous une seule banni&egrave;re, souvent contraints et forc&eacute;s, par l&#39;&eacute;nigmatique Apollyon et sa L&eacute;gion d&#39;Obsidienne.</p><p>Jusqu&#39;&agrave; pr&eacute;sent, les Chevaliers sont parvenus &agrave; prot&eacute;ger Ashfeld contre les attaques des Vikings et des Samoura&iuml;s. Apollyon est persuad&eacute;e que la guerre est imminente et affirme &agrave; ceux qui n&#39;ont pas encore ralli&eacute; son camp que seule sa L&eacute;gion peut d&eacute;fendre leurs terres.</p>', 4, '2017-04-30 20:30:00');

-- --------------------------------------------------------

--
-- Structure de la table `commentary`
--

CREATE TABLE `commentary` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `article_id` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `commentary`
--

INSERT INTO `commentary` (`id`, `user_id`, `date`, `article_id`, `content`, `update_date`) VALUES
(114, 38, '2017-04-30 20:24:00', 69, '<p>Combattant avec de lourdes haches &agrave; deux mains, les hersirs se retrouvent toujours en premi&egrave;re ligne de la horde Viking et d&eacute;coupent tous les ennemis suffisamment fous pour se mettre en travers de leur route. Ils sont v&ecirc;tus de cuirs et d&rsquo;anneaux de fer et arborent fi&egrave;rement les tatouages recouvrant leur corps, en souvenir d&rsquo;anciennes batailles. Ces guerriers redoutables incarnent l&rsquo;id&eacute;al des vrais guerriers Vikings : immense bravoure, int&eacute;grit&eacute; sans faille et passion d&eacute;mesur&eacute;e. Ils savent que l&rsquo;heure de leur mort est d&eacute;j&agrave; fix&eacute;e &agrave; la naissance, ainsi, aucun Viking n&rsquo;a peur de suivre sa destin&eacute;e. Bien s&ucirc;r, tous comptent emporter avec eux le plus d&rsquo;ennemis possible.</p><p>&nbsp;</p><p>Vraiment les meilleurs Guerriers ! Courage, Force et Honneur ! Valhalla !</p>', '2017-04-30 20:24:00'),
(115, 41, '2017-04-30 20:29:00', 70, '<p>Les Orochi sont les assassins imp&eacute;riaux des Samoura&iuml;s. Ils &eacute;cument le champ de bataille comme des fant&ocirc;mes, r&eacute;pandant la terreur et la mort chez ceux qui ont le malheur de croiser leur chemin. Misant plus sur leur ma&icirc;trise de la furtivit&eacute; et du subterfuge que sur leur armure, forc&eacute;ment l&eacute;g&egrave;re, ils &eacute;liminent leurs ennemis &agrave; coups de katana, d&#39;armes de jet ou encore de poison&nbsp;: l&#39;Orochi conna&icirc;t en effet d&#39;innombrables moyens de tuer, car sa loyaut&eacute; &agrave; toute &eacute;preuve en fait le d&eacute;positaire des plus sombres secrets de son clan.</p>', '2017-04-30 20:29:00'),
(116, 40, '2017-04-30 20:30:00', 71, '<p>La Sentinelle est un guerrier noble et puissant qui a vou&eacute; sa vie &agrave; d&eacute;fendre sa terre et son peuple. Redoutable en attaque comme en d&eacute;fense, il porte une armure de plates partielle avec cotte de mailles et cuir. La Sentinelle manie une lourde &eacute;p&eacute;e longue &agrave; deux mains qui lui permet &agrave; la fois d&#39;attaquer et de parer. Non content d&#39;&ecirc;tre un combattant redoutable, c&#39;est aussi un diplomate consomm&eacute; qui incarne l&#39;id&eacute;al chevaleresque. Les candidats sont nombreux, mais bien peu y parviennent.</p>', '2017-04-30 20:30:00'),
(117, 40, '2017-04-30 20:31:00', 69, '<p>Vifs et mortels, les Paladins peuvent gagner une bataille sans que l&#39;ennemi ne soup&ccedil;onne leur pr&eacute;sence. Rares sont les guerriers capables de se fondre ainsi dans l&#39;ombre pour frapper en silence. Ceux-l&agrave; n&#39;ont que faire de la gloire&nbsp;: ils sont les instruments de la mort, qu&#39;elle manie pour infl&eacute;chir le cours des guerres. M&ecirc;me ceux qui jamais ne croiseront leur route auront vent de leurs exploits macabres.</p>', '2017-04-30 20:31:00'),
(118, 38, '2017-04-30 20:32:00', 70, '<p>Le Valhalla. Notre r&eacute;compense pour &ecirc;tre mort au combat. Mais qu&#39;en est-il de ceux qui meurent ailleurs ? Les Valkyries. Un ordre de guerri&egrave;res qui a fait un pacte avec les dieux. Chaque Valkyrie peut acc&eacute;der &agrave; la gloire qui attend chaque Viking tomb&eacute; au combat. Et en temps voulu, accorder une place aux plus m&eacute;ritants. Mais elles seules d&eacute;cident pour qui se battre. Ce sont des sp&eacute;cialistes de la lance et du bouclier. Des &eacute;claireuses efficaces. Et, peut-&ecirc;tre, votre seul espoir de d&eacute;livrance.</p>', '2017-04-30 20:32:00'),
(119, 41, '2017-04-30 20:32:00', 71, '<p>Les villages &agrave; l&#39;ext&eacute;rieur de nos remparts ont besoin d&#39;&ecirc;tre prot&eacute;g&eacute;s. Mais comment d&eacute;fendre le peuple s&#39;il reste si peu de Samoura&iuml;s dans nos arm&eacute;es ? Les Nobushi, combattantes &eacute;l&eacute;gantes et agressives &eacute;quip&eacute;es de l&#39;armure la plus l&eacute;g&egrave;re qui soit et de l&#39;arme la plus incroyable : le naginata. Elles ne semblent pas &ecirc;tre faites pour le combat. Mais, leur apparence est trompeuse. Elles maintiennent nos terres en s&eacute;curit&eacute;. Et nous ne savons m&ecirc;me pas qui elles sont.</p>', '2017-04-30 20:32:00'),
(120, 43, '2017-04-30 20:38:00', 69, '<p>Ne vous laissez pas induire en erreur par son aspect lent et pesant&nbsp;: le Shugoki poss&egrave;de la force d&#39;un d&eacute;mon et une volont&eacute; de fer. Ceux qui se veulent les gardiens de leur peuple doivent faire montre d&#39;un courage exemplaire et savoir placer co&ucirc;te que co&ucirc;te les besoins d&#39;autrui avant les leurs. Voil&agrave; qui n&#39;a jamais pos&eacute; probl&egrave;me aux Shugoki. Leur arme de pr&eacute;dilection para&icirc;t encombrante, mais ils savent lui imprimer la m&ecirc;me pr&eacute;cision qu&#39;&agrave; la premi&egrave;re lame venue.</p>', '2017-04-30 20:38:00'),
(121, 43, '2017-04-30 20:39:00', 70, '<p>Les Fl&eacute;aux sont d&#39;anciens prisonniers et autres conscrits qui ont atteint le rang de soldat d&#39;&eacute;lite. Ceux qui survivent &agrave; leur service d&#39;ost au titre de chair &agrave; canon sont promus et re&ccedil;oivent une intense formation d&#39;infanterie. Ce sont des guerriers en armure lourde qui privil&eacute;gient la d&eacute;fense et manient un fl&eacute;au pesant pour &eacute;liminer leurs ennemis &agrave; l&#39;usure. Partis du tout-venant pour atteindre ce r&ocirc;le prestigieux dans les forces des Chevaliers, les Fl&eacute;aux ont gagn&eacute; le respect de leurs fr&egrave;res &agrave; force de d&eacute;termination et de vaillance.</p>', '2017-04-30 20:39:00'),
(122, 43, '2017-04-30 20:39:00', 71, '<p>C&#39;est une chose que de na&icirc;tre fils de Jarl, une autre que de m&eacute;riter ce titre par le sang, la sueur et l&#39;acier. &Ecirc;tre Jarl, c&#39;est passer sa vie au service de son peuple, occire de son &eacute;p&eacute;e ceux qui veulent lui nuire, prot&eacute;ger de son bouclier ceux qui ne peuvent pas se battre. Leur style de combat, simple mais brutal, les propulse toujours au premier rang des hostilit&eacute;s.</p>', '2017-04-30 20:39:00'),
(123, 44, '2017-04-30 20:40:00', 69, '<p>Le Berserker est un Viking chaotique et brutal muni de deux haches. Son amour inconditionnel du combat en terrifie plus d&#39;un, alli&eacute;s comme ennemis. Il noie l&#39;adversaire sous une pluie d&#39;attaques sans lui laisser le temps de monter une d&eacute;fense digne de ce nom. Il se lance &agrave; corps perdu dans la bataille, au m&eacute;pris de sa d&eacute;fense. Seul compte son tableau de chasse.</p>', '2017-04-30 20:40:00'),
(124, 44, '2017-04-30 20:40:00', 71, '<p>L&agrave; o&ugrave; l&#39;ordre s&#39;effondre. L&agrave; o&ugrave; la cruaut&eacute; et l&#39;anarchie r&egrave;gnent. Les &Eacute;missaires repr&eacute;sentent la justice. Ils sont envoy&eacute;s l&agrave; o&ugrave; r&egrave;gne la d&eacute;solation. Et ils sont entra&icirc;n&eacute;s. Il n&rsquo;y a pas meilleure armure que la leur. Sa fabrication est gard&eacute;e secr&egrave;te par leur ordre. Et leur hache de guerre est une des armes les plus polyvalentes de l&rsquo;Histoire. Priez pour ne pas avoir besoin d&#39;eux. Et quand ils arrivent, priez pour ne pas avoir faut&eacute;.</p>', '2017-04-30 20:40:00'),
(125, 44, '2017-04-30 20:41:00', 70, '<p>Le Kensei incarne &ndash;&nbsp;autant que faire se peut&nbsp;&ndash; le BushidÅ, le code moral des Samoura&iuml;s. Ma&icirc;tre de nombreux arts martiaux, il est conditionn&eacute; d&egrave;s son plus jeune &acirc;ge &agrave; se battre et &agrave; mourir pour son empereur ou son fr&egrave;re d&#39;armes. Le Kensei porte une armure lourde et manie le nodachi, une version longue du katana capable de trancher l&#39;ennemi de quelques coups aussi &eacute;l&eacute;gants que mortels. Il passe sa vie &agrave; se battre et &agrave; s&#39;entra&icirc;ner pour atteindre un niveau de perfection que bien peu peuvent esp&eacute;rer &eacute;galer.</p>', '2017-04-30 20:41:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `faction` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nbr_commentary` int(11) NOT NULL,
  `nbr_articles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `role`, `username`, `email`, `password`, `faction`, `firstname`, `lastname`, `nbr_commentary`, `nbr_articles`) VALUES
(38, 2, 'Hersir', 'hersir@honor.fr', '$2y$10$V0ZLqYSCLut/MoUDKaldZOcZKFeAh/gxCfnuv./ArapyGYElsvRGy', 'Viking', '', '', 2, 0),
(40, 2, 'Sentinelle', 'sentinelle@honor.fr', '$2y$10$r8h50GFUPv3ybyykXLEaRea/nQC2QO2nbqsZg1Si1KW7xmq3T4AqW', 'Chevalier', '', '', 2, 0),
(41, 2, 'Orochi', 'orochi@honor.fr', '$2y$10$8FjvPoxy/47HvA9mI6vNYOJKFQUIiSh4FPxEpWRlUUgSYXXmtsy0S', 'Samurai', '', '', 2, 0),
(42, 3, 'Admin', 'admin@honor.fr', '$2y$10$OriDsR0pzlU0A8cI1g1qVe/Bb.9NFRD/E5T1.ODwdwWAs8rndwPZe', 'Neutre', '', '', 0, 0),
(43, 1, 'Archer', 'archer@honor.fr', '$2y$10$GeOp6hoDQx0zoZw.NspSLexsGUEe4DnBINlSNjnpCADgc64yXe8nC', 'Neutre', '', '', 3, 0),
(44, 1, 'Guerrier', 'guerrier@honor.fr', '$2y$10$CXHTFO2UrredDpnMxK9q7OkHN3sw33ny.6XoFxtLMjUirXlG0N5Ti', 'Neutre', '', '', 3, 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Index pour la table `commentary`
--
ALTER TABLE `commentary`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT pour la table `commentary`
--
ALTER TABLE `commentary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
