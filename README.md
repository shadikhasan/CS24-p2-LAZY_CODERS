# CS24-p2-LAZY_CODERS

## About Us
- Team Name : `LAZY_CODERS`
- Member1 : `Ekramul Islam Shadik` - `shadik.sk420@gmail.com`
- Member2 : 
- Member3 :

## Getting started

### Build Docker file
```
docker-compose build
```




### To start project, run:
```
docker-compose up
```

The Frontend will then be available at [http://127.0.0.1:8080/](http://127.0.0.1:8080/).
The Backend will then be available at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).

---

## Development Guide

### Load Initial Admin
```
docker-compose run --rm app sh -c "python manage.py superuser_init"
```
### To run smtp4dev as a Windows service:

    ```bash
    docker run --rm -it -p 3000:80 -p 2525:25 rnwood/smtp4dev
    ```

