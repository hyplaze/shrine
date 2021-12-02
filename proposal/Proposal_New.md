# CS35L Project Proposal - Shrine

## Team Members

- Alan Yu [azy7@g.ucla.edu](mailto:azy7@g.ucla.edu)
- Chentyi Zhang [chriszhang09@g.ucla.edu](mailto:chriszhang09@g.ucla.edu)
- Randy Gu [rgu855@163.com](mailto:rgu855@163.com)
- Jin Zhang [jinzhang2001@g.ucla.edu](mailto:jinzhang2001@g.ucla.edu)
- Hanry Xu [hanryxu@ucla.edu](mailto:hanryxu@ucla.edu)

## Overall Idea:

The idea of the project for our team is to implement a password vault/manager. It will facilitate users to store and organize their passwords in a more convenient and accessible way.

## Motivation:

It is hard and frustrating to find a password manager that has all the features--such as password generator, password breached checker, TOTP two factor authentication, etc.--available and free in one password manager. We hope to create a web-application that has all the essential password manager features all together as well as easy and convenient to use.

## Features:

- Upload data from Client to Back-end

  Username and passwords provided by users will be saved in the server database.

- Display Dynamic Data to the User

  Added username and passwords will be displayed on the website, avaiable for viewing, copying, and editing.

- Meaningfully search through server-side data

  Users may search for website name or username to retrieve certain passwords.

- Unique Feature #1

  Aside from the basic website name, username, and password, store two factor autehtication (TOTP ) keys and dynamically generate dynamic codes.

- Unique Feature #2

  Provide a random password generator to create stronger and safer passwords.

- Unique Feature #3

  Notify users of repeated and unsafe (breached) passwords.