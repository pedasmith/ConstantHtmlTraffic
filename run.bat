REM Runs IIS Express
set IISEXPRESS="\Program Files (x86)\IIS Express\iisexpress"
set WEBAPP="C:\HtmlApps\ConstantHTMLTraffic"

%IISEXPRESS% /trace:info /path:%WEBAPP%