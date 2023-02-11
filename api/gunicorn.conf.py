wsgi_app = "kengpt.wsgi"

worker_class = "gevent"
workers = 4
timeout = 300
graceful_timeout = 10

pidfile = "/tmp/gunicorn.pid"

errorlog = "-"
accesslog = "/dev/null"
loglevel = "debug"
capture_output = True
