# React + Vite
# Frontend for MIS for DoECE.

## Setup instructions:

### Prerequistes

node must be installed.

### for the first time only

We only need to install all our dependencies only once.
Move to folder with package.json file and type the following command.

```
npm install 
```

### everytime when you need to start development server.

```
npm run dev
```

### this project consist the code for our frontend of MIS system for Department of Electronics and Computer Enginneering.

We have just started out our project so currently it contains only Routine Management system of MIS. Other features would be added by our juniors who will come to 4th year.

[Backend code: MIS](https://github.com/shahchhatru/ayush-mis?fbclid=IwAR1d78G3qc3lpxKT_0bkTw_5JHQmUi0EyalzIWGjHsSydt7yaX9A0cQMsm4)

### Home Screen 

![dashboard](/imgs/dashboard_img1.png)

if you aren't authenticated you will be directed to login page. For authentication mechanism we have used jwt 

![loginpage](/imgs/loginpage.png)

if you click on Routine under the class table you can view classRoutine. 

![classroutine](/imgs/classroutine.png)

when you click on edit icon you get a model where you can update your model.

![editperiodmodel](/imgs/editperiodpage.png)

whe you click on any field you want to edit that is being , card changes to provide a form for upation within the card itself.

![telecommunicationcard](/imgs/telecommunicationcard.png)

For example if I click on the telecommunication card. I will get a form inside card like this for updation.

![subjectfieldupdate](/imgs/updatesubjectfield.png)

similary for other fields on card as well.