SkyTrade
========

In-browser AngularJS application that interacts with the backend FalconEx trading platform via the REST API.

## How do I get SkyTrade running?

Because SkyTrade is an AngularJS application it has no server-side components. It does, however, make use of the FalconEx trading
platform via the REST API it provides.

SkyTrade was designed to be completely decoupled from the backend trading platform and therefore you will need to setup a separate
web server that is capable of serving the AngularJS resources (index.html, javascript, css, and images) from the same domain FalconEx
is hosted on.

One way to do this is to use the Nginx webserver.

### Hosting SkyTrade with Nginx

#### (1) Install Nginx using homebrew (Mac OS X)

```Shell
[~] brew install nginx
```
If you are not using a Mac please see http://wiki.nginx.org/Install for installation instructions.

#### (2) Edit the server section of nginx.conf to reflect your local setup
```Shell
[~] sudo emacs -nw /usr/local/etc/nginx/nginx.conf
```

* Configure the port where Nginx will listen for HTTP requests. In this example port 8080 is used.

* Configure the proxy_pass to be the location of the FalconEx server. In this example FalconEx is running
at http://localhost:9000 (Note: FalconEx can run on a different port, but must be running on the same domain as SkyTrade.)

* Configure the root to be wherever your SkyTrade/public folder is located.

```
server {
    listen       8080;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location ~ ^/api/(.*)$ {
        rewrite            ^/api/(.*)$ /$1 break;
        proxy_pass          http://localhost:9000;
        proxy_set_header    X-Real-IP  $remote_addr;
    }

    location / {
        root   /Users/zscott/project/SkyTrade/public;
        index  index.html index.htm;
    }
```

#### (3) Start Nginx
```Shell
[~] sudo nginx
```

#### (4) View SkyTrade in your browser

(assuming you have configured Nginx to listen on port 8080)
Browse to http://localhost:8080/ and you should see SkyTrade running.

## How can I register for an account so I can log in to SkyTrade?

Registration has not yet been implemented. However, you can register using the legacy application within the FalconEx application.

Once you are registered with the FalconEx server you can login to SkyTrade which will do nothing other than verify that things
are configured correctly.


