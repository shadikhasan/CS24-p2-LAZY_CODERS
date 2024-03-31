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

The API will then be available at [http://127.0.0.1:8080/](http://127.0.0.1:8080/).

---

## Development Guide

### Load Initial Data
```
docker-compose run --rm app sh -c "python manage.py superuser_init"
```

