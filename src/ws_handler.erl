-module(ws_handler).
-behaviour(cowboy_websocket_handler).

-export([init/3]).
-export([websocket_init/3]).
-export([websocket_handle/3]).
-export([websocket_info/3]).
-export([websocket_terminate/3]).

init({tcp, http}, _Req, _Opts) ->
	{upgrade, protocol, cowboy_websocket}.

websocket_init(_TransportName, Req, _Opts) ->
  {Name, _} = cowboy_req:binding(path, Req),
  global:send(app,{register, Name, self()}),
	{ok, Req, {Name}}.

websocket_handle({text, Pad}, Req, {Name}) ->
  global:send(app,{updateAll, Name, Pad, self()}),
  {ok, Req, {Name}}.

websocket_info({update, Pad}, Req, State) ->
  logger:alert("~p ~p",[self(), State]),
  {reply, {text, Pad}, Req, State }.

websocket_terminate(_Reason, _Req, _State) ->
  global:send(app,{unregister, self()}),
	ok.
