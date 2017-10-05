# Demo to demonstrate the Chalice Framework

## Prerequisites:
- AWS credentials setup

## Steps

`virtualenv --python $(which python2.7) ~/.virtualenvs/chalice-demo`

`source ~/.virtualenvs/chalice-demo/bin/activate`

`pip install chalice`

`chalice new-project helloworld`

Open the `app.py` file that's just been created 

`chalice deploy`

`curl` the domain passed by the chalice output.

### Modification  

To show how to expand this, you could use the `introspect` method of the current_request in the app.py.

To enable it just add:

```
@app.route('/introspect')
def introspect
    return app.current_request.to_dict()
```

save the app.py and redeploy using `chalice deploy`


ref: https://github.com/aws/chalice
