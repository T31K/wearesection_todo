# wearesection_todo


# Server
Built with Django REST Framework
```

```
## Build Instructions
### Check python version
```
$ python --version
Python 2.7.x #wrong
```

### Install pyenv
#### I'm using pyenv here, pipenv works fine too
```
$ brew install pyenv
```

### Set up pyenv
```
$ which python
/Users/t31k/.pyenv/shims/python  #correct
/usr/bin/python    #wrong
```
```
$ pyenv install 3.9.0
$ pyenv local 3.9.0
$ pyenv global 3.9.0
$ PATH=$(pyenv root)/shims:$PATH
```

### Ensure system is using pyenv
```
$ python --version
Python 3.9.0
```

### Set up virtual environment

```
$ brew install pyenv-virtualenv
$ pyenv virtualenv django-rest
$ pyenv local django-rest
$ pip install django
$ pip install django-cors-headers
$ pip install djangorestframework
```

### Start server
```
git clone https://github.com/t31k/wearesection_todo
cd server
python manage.py runserver
```

### Ensure server started
```
http://localhost:8000/admin
username: admin
password: password
```

### Please ensure it's running on port 8000 to avoid errors from the client
