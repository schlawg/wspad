-module(ws_handler).
-behaviour(cowboy_websocket).

-export([init/2]).
-export([websocket_init/1]).
-export([websocket_handle/2]).
-export([websocket_info/2]).
-export([terminate/3]).

init(Req, State) ->
    Name = cowboy_req:binding(path, Req),
    {cowboy_websocket, Req, {State, Name}}.

websocket_init(S = {_, Name}) ->
    global:send(app, {register, Name, self()}),
    {[], S}.

websocket_handle({text, Pad}, S = {_, Name}) ->
    global:send(app, {updateAll, Name, Pad, self()}),
    {[], S};
websocket_handle(_Data, S) ->
    {reply, _Data, S}.

websocket_info({update, Pad}, S) ->
    {reply, {text, Pad}, S}.

terminate(_Reason, _Req, _State) ->
    global:send(app, {unregister, self()}),
    ok.
