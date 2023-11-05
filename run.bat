REM Runs IIS Express
set IISEXPRESS="\Program Files (x86)\IIS Express\iisexpress"
set WEBAPP="C:\HtmlApps\ConstantHTMLTraffic"

REM Original command: %IISEXPRESS% /trace:info /path:%WEBAPP%
REM CHT stands for ConstantHtmlTraffic
REM /trace:info actually causes slowdowns in the stats!
%IISEXPRESS% /trace:error /config:ConstantHTMLTraffic.config /site:CHT > delete_me.log
