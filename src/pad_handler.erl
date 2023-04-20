-module(pad_handler).
-behaviour(cowboy_handler).

%-include_lib("kernel/include/logger.hrl").
-export([init/2]).
-export([terminate/3]).

init(Req, State) ->
    logger:alert("Req = ~p", [Req]),
    case cowboy_req:method(Req) of
        <<"GET">> -> get(Req, State);
        <<"POST">> -> post(Req, State);
        Method -> logger:alert("method = ~p", [Method])
    end.

get(Req, State) ->
    Name = cowboy_req:binding(path, Req),
    [C | AssetName] = binary_to_list(Name),
    {Rsp, MimeType} =
        if
            C =:= $_ ->
                {Registry, MediaType, _} = cow_mimetypes:web(Name),
                {read_file(AssetName), wspad:str([Registry, "/", MediaType])};
            true ->
                {read_file("board.html"), "text/html"}
        end,
    cowboy_req:reply(
        200,
        #{<<"content-type">> => wspad:str([MimeType, "; charset=utf-8"])},
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
