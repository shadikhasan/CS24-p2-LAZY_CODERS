# CS24-p2-LAZY_CODERS

## About Us
- Team Name : `LAZY_CODERS`
- Member1 : `Ekramul Islam Shadik` - `shadik.sk420@gmail.com`
- Member2 :  `Abdul Kader Zilani Moududi` - `abdulkader225704@gmail.com`
- Member3 : `Iftekhar Md. Shishir` - `iftekharweb@gmail.com`

## Getting started

### Build a Docker file
```
docker-compose build
```




### To start project, run:
```
docker-compose up
```

The Frontend will then be available at [http://127.0.0.1:8080/](http://127.0.0.1:8080/).
The Backend will then be available at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).
(Initially, the database is empty)
---

## Development Guide

### Load Initial Admin
#### 1.
```
docker-compose run --rm app sh -c "python manage.py initialize_roles"
```
#### 2.
```
docker-compose run --rm app sh -c "python manage.py superuser_init"
```
(The first user will be created as Unassigned. You should change the role to System Admin by logging in to the "Django admin panel([http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin))". After this, you will see full control of the dashboard in frontend([http://127.0.0.1:8080/](http://127.0.0.1:8080/)))

### Username
```
admin2

```
### Password
```
admin2

```
### To run smtp4dev as a Windows service for resetting password links with a token in localhost(fake email server)

```
docker run --rm -it -p 3000:80 -p 2525:25 rnwood/smtp4dev

```

