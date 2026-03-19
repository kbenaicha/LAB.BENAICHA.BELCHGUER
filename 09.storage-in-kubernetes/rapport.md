1. Objectif du lab 9 : L’objectif était de monter ces volumes dans un conteneur Nginx et d’observer leur comportement.
2. Application du monde réel :  stockage temporaire pour des fichiers intermédiaires, caches, traitements batch. Développement local ou partage de fichiers entre le nœud et les conteneurs.
3. Ce lab se situe dans la phase "Deploy" / "Operate" du cycle DevOps. Cela correspond à la mise en production et à l’exploitation continue d’applications conteneurisées.
4. Erreur 403 Forbidden dans Nginx résolut en créant d’un fichier dans le volume.
5. Oui, l’objectif du lab est atteint. Nous avons étudier la différence entre emptyDir, hostPath et PersistentVolume et observé leur comportement lors de la suppression ou du redémarrage des Pods.