# Qfield.Cloud

## Rewamp ideas

- multilingual ? if so => jekyll ?
    => first in english only
    => maybe preapre for translation if not too long
    => jekyll if helpful

- use template ? -> https://onepagelove.com/templates/html-templates (around 20$)

- relation with app.qfield.cloud (similar design ?)
    => yes
    => include "open app" or similar

## Develop

```shell
python -m http.server
# then open http://localhost:8000/
```

## Style

Style is enforced with pre-commit. Before contributing, please run:
```
pip install pre-commit
pre-commit install
```

## Principles

We reuse app.qfield.cloud static files (mainly css). The files are copied to this repo for stability.
