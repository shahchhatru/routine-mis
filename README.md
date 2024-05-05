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


## Build instructions
```
npm run build
```
```
npm run preview
```
### this project consist the code for our frontend of MIS system for Department of Electronics and Computer Enginneering.

We have just started out our project so currently it contains only Routine Management system of MIS. Other features would be added by our juniors who will come to 4th year.

[Backend code: MIS](https://github.com/shahchhatru/ayush-mis?fbclid=IwAR1d78G3qc3lpxKT_0bkTw_5JHQmUi0EyalzIWGjHsSydt7yaX9A0cQMsm4)

### Home Screen 

![dashboard](/imgs/homepage.png)

if you aren't authenticated you will be directed to login page. For authentication mechanism we have used jwt 

![loginpage](/imgs/loginpage.png)

if you click on Routine under the class table you can view classRoutine. 

![classroutine](/imgs/classroutine.png)
with zoom in and zoom out feature along with rotating feature.

![classroutine2](/imgs/zoomoutclassrouitne.png)

when you click on edit icon you get a model where you can update your model.

![editperiodmodel](/imgs/editperiodpage.png)

whe you click on any field you want to edit that is being , card changes to provide a form for upation within the card itself.

![telecommunicationcard](/imgs/telecommunicationcard.png)

For example if I click on the telecommunication card. I will get a form inside card like this for updation.

![subjectfieldupdate](/imgs/updatesubjectfield.png)

similary for other fields on card as well.


![dualscreen](/imgs/dualscreenpage.png)


Simailarly we can divide screen to view both teachers and class routine . left side shows the class routine and right hand side shows the respective teacher routine. If we click on the teacher item of card on the left side routine , The right side teacher routine will change to the routine of the new teacher on which we clickeds.