**Rapport de lab IAC 

 Objectif du laboratoire
L’objectif de ce TP est de comprendre le concept d’Infrastructure as Code (IaC) en mettant en place des machines virtuelles selon deux approches :
-  Approche impérative (Shell + Vagrant)
-  Approche déclarative (Ansible + Vagrant)
-  Mise en place d’un health check GitLab
- Analyse d’un service défaillant (bonus)

***Partie 1 – Approche Impérative avec Vagrant et Shell Provisioner***

L’objectif de cette première partie est de comprendre le principe de IAC à travers une approche impérative.
Nous avons utilisé Vagrant pour créer une machine virtuelle et le Shell Provisioner pour automatiser certaines configurations à l’intérieur de cette VM.

Dans notre cas, nous travaillons sur un Mac M2 (architecture ARM64).
Nous avons adapté la configuration en utilisant :
Une box ARM : perk/ubuntu-2204-arm64
Le provider : qemu
Vagrant pour l’orchestration de la VM

**Création de la Machine Virtuelle**

Vagrant.configure("2") do |config|
  config.vm.define "centos_server" do |server|

    server.vm.box = "perk/ubuntu-2204-arm64"

    server.vm.provider "qemu" do |qe|
      qe.ssh_port = "50022"
      qe.memory = 2048
      qe.cpus = 1
    end

    server.vm.provision "shell",
      inline: "echo Hello, World > /tmp/provision_test"

  end
end

### Démarrage de la VM : 

vagrant up --provider=qemu

## will check VMs status
vagrant status 

 stop the VMs

vagrant halt

 will destroy VMs 
vagrant destroy
```

### 3. Check that everything is ok by connecting to the VM via SSH

vagrant ssh : je suis rentrée à la VM 
cat /tmp/provision_test
cat /etc/hosts.   la connexion ssh est validée 

### 4. Play with different commands for Shell Provisioner
 ## Étape 1 – Modifier le Vagrantfile 

 server.vm.provision "shell",
  inline: "echo '127.0.0.1 mydomain-1.local' | sudo tee -a /etc/hosts"

## Étape 2 – Appliquer le provisioning
vagrant provision

Étape 3 – Vérifier dans la VM
vagrant ssh
cat /etc/hosts

part 2 : Enregistrer la date de provisioning
l'objectif de cette partie est de créer un fichier contenant la date du provisioning.
Cela permet de :
- Vérifier quand le provisioning a été exécuté
- Montrer que la VM est reproductible

Modification de vagrantfile
server.vm.provision "shell", inline: <<-SHELL
  echo I am provisioning...
  date | sudo tee /etc/vagrant_provisioned_at
SHELL

apres : 
vagrant provision
verfifictaion avec : 
vagrant ssh
cat /etc/vagrant_provisioned_at
 
 la reponse : nt ssh
cat /etc/vagrant_provisioned_at

Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-143-generic aarch64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Thu Feb 12 14:56:58 UTC 2026

  System load:           0.09
  Usage of /:            2.7% of 61.84GB
  Memory usage:          10%
  Swap usage:            0%
  Processes:             98
  Users logged in:       0
  IPv4 address for eth0: 10.0.2.15
  IPv6 address for eth0: fec0::5054:ff:fe12:3456


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
New release '24.04.3 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


Last login: Thu Feb 12 14:31:03 2026 from 10.0.2.2
vagrant@ubuntu:~$ 