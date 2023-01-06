-module(pad_handler).
-behaviour(cowboy_http_handler).

%-include_lib("kernel/include/logger.hrl").
-export([init/3]).
-export([handle/2]).
-export([terminate/3]).

init(_, Req, []) ->
	{ok, Req, {}}.

handle(Req, State) ->
	case cowboy_req:method(Req) of
		{<<"GET">>, _} -> get(Req, State);
		{<<"POST">>, _} -> post(Req, State);
		{Method, _} -> logger:alert("method = ~p", [Method])
	end.

get(Req, State) ->
  {Name, _} = cowboy_req:binding(path, Req),
  [C|_] = binary_to_list(Name),
  {Rsp, MimeType} = if 
    C =:= $_ ->
      {Registry, MediaType, _} = cow_mimetypes:web(Name),
      {read_file(Name), wspad:str([Registry, "/", MediaType])};
    true ->
      {read_file("_board.html"), "text/html"}
  end,
  cowboy_req:reply(
    200, 
    [{<<"content-type">>, wspad:str([MimeType, "; charset=utf-8"])}], 
    Rsp, 
    Req
  ),    
	{ok, Req, State}.
  
post(Req, State) -> 
	{ok, Req, State}.

read_file(Name) ->
  {ok, Binary} = file:read_file(wspad:asset(Name)),
  Binary.

terminate(_Reason, _Req, _State) ->
 	ok.
