# Bienvenue sur mon Journal de Bord !

Bonjour à toute l'équipe de Fastory !

Je vais vous partager le compte-rendu de mon test technique et vous expliquer comment le lancer.

(Je me permets de vous repréciser que j'ai travaillé sur ce projet pendant la période du 13 au 20 octobre 2020, tout en ayant aucune expérience sur ReactJS initialement. Par conséquent, c'est la première fois que je code avec ReactJS et il est fort probable que mon code comporte des mauvaises pratiques. Si vous avez des axes d'améliorations à me donner, n'hésitez pas.)

### Back-End

Le back-end a été effectué grâce au framework Express.JS. J'ai fait ce choix car je n'ai jamais eu l'occasion d'utiliser Hapi et j'ai fait en sorte de mettre un maximum de temps à profit pour mon apprentissage de React.
Le serveur se lance grâce à la commande "node index.js USERNAME PASSWORD". 
Comme vous pouvez constater, le système d'authentification est pris en charge. Normalement, vous connaissez les identifiants requis..

Voici le contenu du fichier .env nécessaire au fonctionnement du back-end :

> PORT=3030
SWAPI_URL=https://swapi.dev/api
BACK_URL=http://localhost:3030
FRONT_URL=http://localhost:3000
JEDI_USERNAME=Luke
HASH_PASSWORD=$2b$10$CO9PlrL2FeXHRI8yxDGDqONK487X3.qxeJm7r1jM20khmm8v1DdV6

### Front-End

- Le front-end a été effectué avec ReactJS comme demandé.
- L'API ne permet pas de récupérer les images des résultats. Par conséquent, je n'ai affiché que les noms des résultats. Au clic, on est redirigé sur une fiche détaillant le résultat en question.
- Un message s'affiche pour notifier l'utilisateur et améliorer son expérience.
- Des fiches détaillant les résultats ont été implantés. Elles sont différentes en fonction du type de donnée.
- Un router a été également implémenté. Il permet d'accéder à n'importe quelle fiche et d'accéder directement au résultat d'une recherche.

Le front-end se lance grâce à la commande "yarn start".

Voici le contenu du fichier .env nécessaire au fonctionnement du back-end :

> REACT_APP_BACK_URL=http://localhost:3030
REACT_APP_FRONT_URL=http://localhost:3000

### Le mot de la fin

Ce projet était très formateur. J'espère qu'il vous plaira !

Je tenais à vous remercier d'avoir lu ce rapport jusqu'au bout et pour le temps que vous m'avez accordé. Si vous rencontrez la moindre difficulté concernant le test technique, n'hésitez pas à me solliciter. Je serais bien évidemment disponible.

J'ai hâte d'avoir votre feedback. Bien à vous,

Bryan