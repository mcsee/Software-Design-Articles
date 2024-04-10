# Explain in 5 Levels of Difficulty: GIT
            
![Explain in 5 Levels of Difficulty: GIT](Explain%20in%205%20Levels%20of%20Difficulty:%20GIT.png)

*Know and understand this fantastic tool*				

> TL;DR: What is GIT and why should you learn how to use it?

I will explain [GIT](https://en.wikipedia.org/wiki/Git) in five levels to different audiences.

Many junior developers are asking me which language or fancy framework is better to start their career.

My answer is always the same: 

> Languages and frameworks come and go. Study [English](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20128%20-%20Non%20English%20Coding/readme.md) and study GIT.

# Child

GIT is like a magic notebook where you can write down all the changes you make to your computer projects. 

Do you know when you draw a picture and you can't erase it or make it like before? 

Sometimes when we work on big projects, we also want to go back and see the older versions of our pictures. 

You can keep all the different versions of your pictures and go back and look at them if you want to.

You can draw on same picture with your friends without experiencing confusion with the changes.

it is like a time capsule for your work.

# Teen

GIT is a tool to keep track of changes in your computer files, especially when working with other people on a project.

Friends can work on the same files at the same time, without overwriting each other's changes by accident. 

GIT also allows you to save different versions of your work, so you can go back to an earlier version if you need to. 

# College Student

GIT is a distributed version control system. 

It allows developers to work on the same codebase simultaneously, without interfering with one another's changes. 

It uses a unique algorithm to track changes in files.

GIT maintains a history of all the changes made to the codebase. 

Developers can collaborate on the same project, while still maintaining the ability to work independently. 

If you need to go back to an older version of your work, this tool makes it easy to do that with the code you wrote.

Software developers widely use GIT and consider it an industry standard.

It is also open-source, which means that anyone can use it for free.

# Graduate Student

GIT allows developers to track changes made to source code over time. 

This tool allows for the simultaneous collaboration of multiple developers on the same codebase, while also maintaining a comprehensive record of all changes made by each individual developer.

GIT allows for easy collaboration, rollback of changes, and management of different versions of code. 

Some key features of GIT include the ability to create branches and merge them, view the history of changes made to a codebase, and handle conflicts.

Conflicts arise when multiple people are working on the same code.

# Expert

GIT is a distributed version control system that allows software developers to manage and track changes made to their source code. 

It is based on a data model that consists of a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) of commits, where each commit represents a snapshot of the codebase at a specific point in time.

GIT allows for multiple branches to exist in a codebase, with the ability to easily merge changes from one branch to another. 

It uses a three-way merge algorithm, which allows it to efficiently handle conflicts that may arise when merging changes from multiple branches.

GIT allows staging changes before committing. 

You can use hooks to automate tasks and handle large binary files using [GIT LFS](https://git-lfs.com/).

With GIT, it is possible to generate and transition between numerous local and remote repositories.

GIT has a robust plugin ecosystem and various third-party tools.

Some tools are [GIT GUI](https://git-scm.com/downloads/guis) clients, GIT hosting platforms, and GIT workflow automation tools, which enable teams to use GIT in various ways to suit their needs.

The three-way merge algorithm used by GIT compares the common ancestor version of a file with the version in the current branch, and the version in the branch that is being merged. 

This allows GIT to detect and handle conflicts that may arise when merging changes made in different branches.

The process of a three-way merge works as follows:

1. GIT first identifies the common ancestor version of the file that is being merged. This is the version of the file that existed before any changes were made in the current and target branches.

2. GIT compares the ancestor version of the file with the version in the current branch. It then records all the changes made in the current branch in a special "current" version of the file.

3. GIT compares the ancestor version of the file with the version in the target branch and records all the changes made in the target branch in a special "target" version of the file.

4. GIT takes the common ancestor version of the file and applies the changes recorded in the current and target versions to it. If any conflicts arise (for example, if the same lines of code have been changed in both the current and target branches), GIT will mark these conflicts in the final version of the file and prompt the user to resolve them manually.

By using this algorithm, GIT can efficiently manage merge conflicts and guarantee that the ultimate version of the file represents a coherent and consistent integration of the changes made in both branches.