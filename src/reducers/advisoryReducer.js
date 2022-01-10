const initialState = {
    selectedProduct : '',
    blackList : [{info:['classifiers','downloads','requires_dist'],versions:['digests'],sanbox:[],vul:[]}],
    advisoryResults : {
        "package":"requests",
        "analysis":{
           "info":{},
           "author":"Kenneth Reitz",
           "author_email":"me@kennethreitz.org",
           "classifiers":[
              "Development Status :: 5 - Production/Stable",
              "Intended Audience :: Developers",
              "License :: OSI Approved :: Apache Software License",
              "Natural Language :: English",
              "Programming Language :: Python",
              "Programming Language :: Python :: 2",
              "Programming Language :: Python :: 2.7",
              "Programming Language :: Python :: 3",
              "Programming Language :: Python :: 3.6",
              "Programming Language :: Python :: 3.7",
              "Programming Language :: Python :: 3.8",
              "Programming Language :: Python :: 3.9",
              "Programming Language :: Python :: Implementation :: CPython",
              "Programming Language :: Python :: Implementation :: PyPy"
           ],
           "home_page":"https://requests.readthedocs.io",
           "license":"Apache 2.0",
           "name":"requests",
           "package_url":"https://pypi.org/project/requests/",
           "project_url":"https://pypi.org/project/requests/",
           "release_url":"https://pypi.org/project/requests/2.26.0/",
           "requires_dist":[
              "urllib3 (<1.27,>=1.21.1)",
              "certifi (>=2017.4.17)",
              "chardet (<5,>=3.0.2) ; python_version < \"3\"",
              "idna (<3,>=2.5) ; python_version < \"3\"",
              "charset-normalizer (~=2.0.0) ; python_version >= \"3\"",
              "idna (<4,>=2.5) ; python_version >= \"3\"",
              "PySocks (!=1.5.7,>=1.5.6) ; extra == 'socks'",
              "win-inet-pton ; (sys_platform == \"win32\" and python_version == \"2.7\") and extra == 'socks'",
              "chardet (<5,>=3.0.2) ; extra == 'use_chardet_on_py3'"
           ],
           "summary":"Python HTTP for Humans.",
           "version":"2.26.0",
           "requires_python":">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*, !=3.4.*, !=3.5.*",
           "description":"# Requests\n\n**Requests** is a simple, yet elegant, HTTP library.\n\n```python\n>>> import requests\n>>> r = requests.get('https://api.github.com/user', auth=('user', 'pass'))\n>>> r.status_code\n200\n>>> r.headers['content-type']\n'application/json; charset=utf8'\n>>> r.encoding\n'utf-8'\n>>> r.text\n'{\"type\":\"User\"...'\n>>> r.json()\n{'disk_usage': 368627, 'private_gists': 484, ...}\n```\n\nRequests allows you to send HTTP/1.1 requests extremely easily. There\u2019s no need to manually add query strings to your URLs, or to form-encode your `PUT` & `POST` data \u2014 but nowadays, just use the `json` method!\n\nRequests is one of the most downloaded Python package today, pulling in around `14M downloads / week`\u2014 according to GitHub, Requests is currently [depended upon](https://github.com/psf/requests/network/dependents?package_id=UGFja2FnZS01NzA4OTExNg%3D%3D) by `500,000+` repositories. You may certainly put your trust in this code.\n\n[![Downloads](https://pepy.tech/badge/requests/month)](https://pepy.tech/project/requests/month)\n[![Supported Versions](https://img.shields.io/pypi/pyversions/requests.svg)](https://pypi.org/project/requests)\n[![Contributors](https://img.shields.io/github/contributors/psf/requests.svg)](https://github.com/psf/requests/graphs/contributors)\n\n## Installing Requests and Supported Versions\n\nRequests is available on PyPI:\n\n```console\n$ python -m pip install requests\n```\n\nRequests officially supports Python 2.7 & 3.6+.\n\n## Supported Features & Best\u2013Practices\n\nRequests is ready for the demands of building robust and reliable HTTP\u2013speaking applications, for the needs of today.\n\n- Keep-Alive & Connection Pooling\n- International Domains and URLs\n- Sessions with Cookie Persistence\n- Browser-style TLS/SSL Verification\n- Basic & Digest Authentication\n- Familiar `dict`\u2013like Cookies\n- Automatic Content Decompression and Decoding\n- Multi-part File Uploads\n- SOCKS Proxy Support\n- Connection Timeouts\n- Streaming Downloads\n- Automatic honoring of `.netrc`\n- Chunked HTTP Requests\n\n## API Reference and User Guide available on [Read the Docs](https://requests.readthedocs.io)\n\n[![Read the Docs](https://raw.githubusercontent.com/psf/requests/master/ext/ss.png)](https://requests.readthedocs.io)\n\n## Cloning the repository\n\nWhen cloning the Requests repository, you may need to add the `-c\nfetch.fsck.badTimezone=ignore` flag to avoid an error about a bad commit (see\n[this issue](https://github.com/psf/requests/issues/2690) for more background):\n\n```shell\ngit clone -c fetch.fsck.badTimezone=ignore https://github.com/psf/requests.git\n```\n\nYou can also apply this setting to your global Git config:\n\n```shell\ngit config --global fetch.fsck.badTimezone ignore\n```\n\n---\n\n[![Kenneth Reitz](https://raw.githubusercontent.com/psf/requests/master/ext/kr.png)](https://kennethreitz.org) [![Python Software Foundation](https://raw.githubusercontent.com/psf/requests/master/ext/psf.png)](https://www.python.org/psf)\n\n\n",
           "releases":{},
           "vulnerability":{},
           "download_stats":{
              "last_day":3538912,
              "last_month":129760315,
              "last_week":29076440
           },
           "sandboxing":{
              "analysis":{}
           }
        },
        "popularity":"",
        "maintainance":"",
        "vulnerable_dependancies":"",
        "code_review":"",
        "community":""
     },
     result_id:'',
     scanning : false,
     searchTerm  : ''
}

const advisoryReducer = (state = initialState, action) => {
    switch(action.type){
        case "setProduct":
            return {...state, selectedProduct: action.payload}
        case "setAdvisoryResults":
            return {...state, advisoryResults : action.payload }
        case "setPollingId":
            return {...state, result_id:action.payload}
        case "setScanning" :
            return {...state, scanning : action.payload}
        case "setSearchTerm" :
            return {...state, searchTerm : action.payload}
        
            default:
                return state;
    }
}

export default advisoryReducer;