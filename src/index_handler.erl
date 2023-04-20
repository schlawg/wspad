-module(index_handler).
-behaviour(cowboy_handler).

-export([init/2]).
-export([terminate/3]).
-export([execute/2]).

init(#{method := Method} = Req, State) ->
    case cowboy_req:method(Req) of
        <<"GET">> -> get(Req, State);
        <<"POST">> -> post(Req, State);
        Method -> logger:alert("method = ~p", [Method])
    end,
    {ok, Req, State}.

get(Req, State) ->
    cowboy_req:reply(
        200,
        #{<<"content-type">> => <<"text/html; charset=utf-8">>},
        [index()],
        Req
    ),
    {ok, Req, State}.

post(Req, State) ->
    {ok, Req, State}.
% update(Name, Text) -> {Name, Text}.

index() ->
    case (file:list_dir(wspad:db_loc())) of
        {error, Reason} ->
            logger:alert("Cuz: ~p", [Reason]);
        {ok, Pads} ->
            [{_, T} | _] = ets:lookup(templates, index),
            bbmustache:compile(T, #{"pads" => Pads})
    end.

terminate(_Reason, _Req, _State) ->
    ok.

execute(Req, Env) ->
    {ok, Req, Env}.
