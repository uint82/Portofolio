import markdown
from markdown.extensions import codehilite, fenced_code

def custom_markdownify(content):
    return markdown.markdown(
        content,
        extensions=[
            'markdown.extensions.fenced_code',
            'markdown.extensions.codehilite',
            'markdown.extensions.tables',
            'markdown.extensions.nl2br',
        ],
        extension_configs={
            'markdown.extensions.codehilite': {
                'linenums': False,
                'css_class': 'codehilite',
            }
        }
    )
