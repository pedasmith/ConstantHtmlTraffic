REM Runs IIS Express
set IISEXPRESS="\Program Files (x86)\IIS Express\iisexpress"
set WEBAPP="C:\HtmlApps\ConstantHTMLTraffic"

REM Original command: %IISEXPRESS% /trace:info /path:%WEBAPP%
REM CHT stands for ConstantHtmlTraffic
%IISEXPRESS% /trace:info /config:ConstantHTMLTraffic.config /site:CHT
