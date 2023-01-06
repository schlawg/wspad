-module(index_handler).
-behaviour(cowboy_http_handler).

-export([init/3]).
-export([handle/2]).
-export([terminate/3]).

init(_, Req, []) ->
	{ok, Req, {balls}}.

handle(Req, State) ->
	case cowboy_req:method(Req) of
		{<<"GET">>, _} -> get(Req, State);
		{<<"POST">>, _} -> post(Req, State);
		{Method, _} -> logger:alert("method = ~p", [Method])
	end,
	%cowboy_req:reply(200, Req),
	{ok, Req, State}.

get(Req, State) ->
  cowboy_req:reply(200, [
     		{<<"content-type">>, <<"text/html; charset=utf-8">>}
     	], [index()], Req),
	{ok, Req, State}.
  
post(Req, State) -> 
	{ok, Req, State}.
% update(Name, Text) -> {Name, Text}.

index() -> 
  case (file:list_dir(wspad:db_loc())) of
    {error, Reason} -> logger:alert("Cuz: ~p", [Reason]);
    {ok, Pads} ->
      unicode:characters_to_list([
        "
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">
    <link href=\"_style.css\" rel=\"stylesheet\"/>
  </head>
  <body>
    <ul>",
        padLink(Pads, ""), 
    "</ul>
  </body>
</html>"
      ])
    end.
    

padLink([], ListHtml) ->
  ListHtml;
padLink([Name|Tail], ListHtml) ->
  padLink(Tail, ListHtml ++ "<li><a href=\"/" ++ Name ++ "\">" ++ Name ++ "</li>").


% read_file(Name) ->
%   {ok, Binary} = file:read_file(full_path(Name)),
%   Binary.

% full_path(Name) ->
%   filename:join([code:priv_dir(wspad), Name]).

%file_exists(Name) ->
%  case file:read_file_info(full_path(Name)) of
%    {ok, _Info} -> true;
%    {error, _Reason} -> false
%  end.
  
%maybe_echo(<<"POST">>, true, Req) ->
%	{ok, PostVals, Req2} = cowboy_req:body_qs(Req),
%	Echo = proplists:get_value(<<"echo">>, PostVals),
% 	echo(Echo, Req2);
% maybe_echo(<<"POST">>, false, Req) ->
% 	cowboy_req:reply(400, [], <<"Missing body.">>, Req);
% maybe_echo(_, _, Req) ->
% 	%% Method not allowed.
% 	cowboy_req:reply(405, Req).

% echo(undefined, Req) ->
% 	cowboy_req:reply(400, [], <<"Missing echo parameter.">>, Req);
% echo(Echo, Req) ->
% 	cowboy_req:reply(200, [
% 		{<<"content-type">>, <<"text/plain; charset=utf-8">>}
% 	], Echo, Req).

 	terminate(_Reason, _Req, _State) ->
 	ok.
