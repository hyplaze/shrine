<p align="center">
    <img src="./shrine-web/src/Assets/logo.png"  width="130" height="130" >
    <h1 align="left">Shrine</h1>
</p>

## Introduction

Shrine is a web-based application that helps safely store and retrieve passwords with ease.

## Features

- Storing basic password infos: name, url, username, password, two factor authentication secret
- End-to-end encryption with end-to-end AES-GCM 128 encryption, salted hashing, and PBKDF2 SHA-256
- Dynamic TOTP code generation
- Search all stored items by name, username, and url
- Password generation with multiple tweaks
- Password breach report (while preserving k-anonymity)

## Build/Run
### Requirements

- Node.js (tested on v16.13.0)
- npm (tested on 8.1.0)
- A local or remote MongoDB (currently provided in server, will be invalid in future release)

### Run the app

For local development, first start the server with:
```shell
cd server
npm install
npm start
```

Then start the client:
```shell
cd shrine-web
npm install
npm start
```

You can now access the web shrine in your browser at `http://localhost:3001`.

## Contributers

Shrine is a collaboration project for UCLA CS35L course. Team members:
- Alan Yu
- Chentyi Zhang
- Randy Gu
- Jin Zhang
- Hanry Xu
